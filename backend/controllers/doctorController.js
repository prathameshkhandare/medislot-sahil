import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import sendMail from '../utils/sendMail.js';
import razorpay from 'razorpay';

const getRazorpayInstance = () => {
    return new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};


// API for doctor Login 
const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await doctorModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for doctor panel
// const appointmentCancel = async (req, res) => {
//     try {

//         const { docId, appointmentId } = req.body

//         const appointmentData = await appointmentModel.findById(appointmentId)
//         if (appointmentData && appointmentData.docId === docId) {
//             await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
//             return res.json({ success: true, message: 'Appointment Cancelled' })
//         }

//         res.json({ success: false, message: 'Appointment Cancelled' })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }


const appointmentCancel = async (req, res) => {
    try {
      const { docId, appointmentId } = req.body;
      console.log("Cancel request for appointmentId:", appointmentId);
  
      // Fetch appointment with userData already included
      const appointment = await appointmentModel.findById(appointmentId);
  
      if (!appointment) {
        console.log("Appointment not found");
        return res.json({ success: false, message: "Appointment not found" });
      }
  
      // Check if the appointment belongs to this doctor
      if (appointment.docId.toString() !== docId.toString()) {
        console.log("Unauthorized doctor");
        return res.json({ success: false, message: "Unauthorized to modify this appointment" });
      }
  
      // Check if the appointment is already cancelled or completed
      if (appointment.cancelled || appointment.isCompleted) {
        console.log("Appointment already cancelled or completed");
        return res.json({ success: false, message: "Appointment already cancelled or completed" });
      }
  
      // Update the appointment status - IMPORTANT: Update both status and cancelled flag
      appointment.status = "Cancelled";
      appointment.cancelled = true;
  
      // Handle Automatic Refund if payment was completed online
      let refundMessage = "";
      if (appointment.payment && !appointment.isRefunded) {
        try {
          const razorpayInstance = getRazorpayInstance();
          let targetPaymentId = appointment.paymentId;
  
          // If paymentId not on record, find recent captured payment for this amount
          if (!targetPaymentId) {
            console.log("Searching captured payments for appointment:", appointmentId);
            const allPayments = await razorpayInstance.payments.all({ count: 10 });
            const match = allPayments.items.find(p => p.status === "captured" && p.amount === appointment.amount * 100);
            if (match) {
              targetPaymentId = match.id;
            }
          }
  
          if (targetPaymentId) {
            const refundResponse = await razorpayInstance.payments.refund(targetPaymentId, {
              amount: appointment.amount * 100,
              notes: {
                reason: "Cancelled by Doctor",
                appointmentId: appointmentId.toString(),
              }
            });
  
            appointment.isRefunded = true;
            appointment.refundId = refundResponse.id || "";
            appointment.paymentId = targetPaymentId;
            console.log("Automatic refund processed successfully:", refundResponse.id);
            refundMessage = ` A full refund of ₹${appointment.amount} has been initiated to your original payment method.`;
          } else {
            console.log("Could not locate payment ID for refund.");
          }
        } catch (refundErr) {
          console.error("Razorpay automatic refund error:", refundErr);
          refundMessage = " Please note our support team will process your refund manually.";
        }
      }
  
      await appointment.save();
      console.log("Appointment status updated to Cancelled");
  
      // Free up the doctor slot
      const { docId: dId, slotDate, slotTime } = appointment;
      const doctorData = await doctorModel.findById(dId);
      if (doctorData && doctorData.slots_booked && doctorData.slots_booked[slotDate]) {
        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        await doctorModel.findByIdAndUpdate(dId, { slots_booked });
      }
  
      // Get user email directly from userData
      const userEmail = appointment.userData?.email;
      console.log("User email for cancellation:", userEmail);
  
      if (userEmail) {
        await sendMail(
          userEmail,
          "Appointment Cancelled and Refund Initiated",
          `Dear Patient, 

We regret to inform you that your upcoming appointment on ${appointment.slotDate} at ${appointment.slotTime} has been canceled due to unforeseen circumstances.${refundMessage}

We sincerely apologize for the inconvenience. Please contact us or book a new appointment at your convenience.

Thank you for your understanding.`
        );
        console.log("Cancellation email sent successfully to", userEmail);
      }
  
      res.json({
        success: true,
        message: `Appointment cancelled successfully.${appointment.isRefunded ? " Refund initiated." : ""}`
      });
    } catch (error) {
      console.error("Error in appointmentCancel controller:", error);
      res.json({ success: false, message: error.message });
    }
  };
  
  


// API to mark appointment completed for doctor panel
// const appointmentComplete = async (req, res) => {
//     try {

//         const { docId, appointmentId } = req.body

//         const appointmentData = await appointmentModel.findById(appointmentId)
//         if (appointmentData && appointmentData.docId === docId) {
//             await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
//             return res.json({ success: true, message: 'Appointment Completed' })
//         }

//         res.json({ success: false, message: 'Appointment Cancelled' })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }


const appointmentComplete = async (req, res) => {
    try {
      const { docId, appointmentId } = req.body;
      console.log("Completing appointment ID:", appointmentId);
  
      // Fetch appointment
      const appointment = await appointmentModel.findById(appointmentId);
  
      if (!appointment) {
        console.log("Appointment not found");
        return res.json({ success: false, message: "Appointment not found" });
      }
  
      // Check if the appointment belongs to this doctor
      if (appointment.docId.toString() !== docId.toString()) {
        console.log("Unauthorized doctor");
        return res.json({ success: false, message: "Unauthorized to modify this appointment" });
      }
  
      // Check if the appointment is already cancelled or completed
      if (appointment.cancelled || appointment.isCompleted) {
        console.log("Appointment already cancelled or completed");
        return res.json({ success: false, message: "Appointment already cancelled or completed" });
      }
  
      // Update the appointment status - IMPORTANT: Update both status and isCompleted flag
      appointment.status = "Completed";
      appointment.isCompleted = true;
      await appointment.save();
      console.log("Appointment status updated to Completed");
  
      // Get user email directly from userData
      const userEmail = appointment.userData?.email;
      console.log("Sending email to:", userEmail);
  
      if (userEmail) {
        await sendMail(
          userEmail,
          "Appointment Completed",
          `Dear Patient, 

Thank you for visiting us today. Your appointment on ${appointment.slotDate} at ${appointment.slotTime} has been successfully completed. 
It was a pleasure meeting with you. Please remember to follow the recommendations discussed during your visit. If you have any questions, concerns, or need to schedule a follow-up, feel free to contact our office.

Wishing you good health and wellness! `
        );
        console.log("Completion email sent successfully to", userEmail);
      }
  
      res.json({ success: true, message: "Appointment completed successfully." });
    } catch (error) {
      console.error("Error in appointmentComplete controller:", error);
      res.json({ success: false, message: error.message });
    }
  };


// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email'])

        // For each doctor, count their completed appointments
        const doctorsWithStats = await Promise.all(doctors.map(async (doc) => {
            const completedCount = await appointmentModel.countDocuments({
                docId: doc._id.toString(),
                isCompleted: true
            })
            return { ...doc.toObject(), completedAppointments: completedCount }
        }))

        res.json({ success: true, doctors: doctorsWithStats })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    doctorList,
    changeAvailablity,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
}