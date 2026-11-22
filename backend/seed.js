import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

// ── Models ───────────────────────────────────────────────
const doctorSchema = new mongoose.Schema({
    name: String, email: { type: String, unique: true },
    password: String, image: String, speciality: String,
    degree: String, experience: String, about: String,
    available: { type: Boolean, default: true },
    fees: Number, slots_booked: { type: Object, default: {} },
    address: Object, date: Number,
}, { minimize: false })

const blogSchema = new mongoose.Schema({
    title: String, content: String,
    author: String, image: String, category: String,
}, { timestamps: true })

const Doctor = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)
const Blog   = mongoose.models.Blog   || mongoose.model('Blog', blogSchema)

// ── Connect ───────────────────────────────────────────────
await mongoose.connect(process.env.MONGODB_URI)
console.log('✅ Connected to MongoDB')

// ── Placeholder image (public domain flat illustration) ───
const AVATAR = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'

// ── Doctors Seed ──────────────────────────────────────────
const hashedPass = await bcrypt.hash('doctor@123', 10)

const doctors = [
    {
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Counsellor',
        degree: 'M.A. Psychology, PhD Clinical Psychology',
        experience: '8 Years',
        about: 'Dr. Priya Sharma is a licensed clinical psychologist specialising in anxiety, depression, relationship issues and trauma recovery. She uses a compassionate, evidence-based approach combining CBT and mindfulness to help clients achieve lasting mental wellness.',
        fees: 800,
        address: { line1: 'Serenity Wellness Centre, FC Road', line2: 'Pune, Maharashtra - 411004' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Arjun Mehta',
        email: 'arjun.mehta@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Counsellor',
        degree: 'M.Sc. Counselling Psychology',
        experience: '5 Years',
        about: 'Dr. Arjun Mehta focuses on adolescent counselling, career guidance and stress management. He creates a safe, non-judgmental space and uses solution-focused therapy to empower his clients.',
        fees: 600,
        address: { line1: 'MindSpace Clinic, Baner', line2: 'Pune, Maharashtra - 411045' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Sneha Kulkarni',
        email: 'sneha.kulkarni@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Dentist',
        degree: 'BDS, MDS Prosthodontics',
        experience: '6 Years',
        about: 'Dr. Sneha Kulkarni is a skilled prosthodontist offering comprehensive dental care including root canals, dental implants, veneers and teeth whitening. She ensures a pain-free experience using the latest technology.',
        fees: 700,
        address: { line1: 'SmilePlus Dental Clinic, Kothrud', line2: 'Pune, Maharashtra - 411038' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Rohan Desai',
        email: 'rohan.desai@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Dentist',
        degree: 'BDS, Orthodontics Certification',
        experience: '4 Years',
        about: 'Dr. Rohan Desai specialises in orthodontics and cosmetic dentistry. Known for his gentle approach and precision aligners, he helps patients achieve confident, beautiful smiles.',
        fees: 600,
        address: { line1: 'BrightSmile Orthodontic Centre, Wakad', line2: 'Pune, Maharashtra - 411057' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Kavya Nair',
        email: 'kavya.nair@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Dermatologist',
        degree: 'MBBS, MD Dermatology',
        experience: '7 Years',
        about: 'Dr. Kavya Nair is a board-certified dermatologist treating acne, eczema, psoriasis, and pigmentation disorders. She also offers cosmetic procedures including chemical peels, laser therapy and Botox.',
        fees: 900,
        address: { line1: 'SkinGlow Derma Clinic, Aundh', line2: 'Pune, Maharashtra - 411007' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Sameer Joshi',
        email: 'sameer.joshi@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Dermatologist',
        degree: 'MBBS, MD Dermatology & Venereology',
        experience: '10 Years',
        about: 'Dr. Sameer Joshi is a senior dermatologist with expertise in hair loss, skin infections, and cosmetic dermatology. He has performed over 2000 successful skin procedures and mentors junior dermatologists.',
        fees: 1200,
        address: { line1: 'DermaCare Advanced Skin Centre, Koregaon Park', line2: 'Pune, Maharashtra - 411001' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Nisha Verma',
        email: 'nisha.verma@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Hair Specialist',
        degree: 'Diploma in Trichology, Certified Hair Transplant Technician',
        experience: '9 Years',
        about: 'Nisha Verma is a certified trichologist specialising in hair loss treatment, scalp analysis, PRP therapy and hair transplant consultations. She has transformed thousands of clients with her personalised hair care protocols.',
        fees: 700,
        address: { line1: 'LuxeHair Studio, Camp Area', line2: 'Pune, Maharashtra - 411001' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Rahul Tonsalkar',
        email: 'rahul.tonsalkar@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Hair Specialist',
        degree: 'Certified Trichologist, Advanced Cosmetology Diploma',
        experience: '6 Years',
        about: 'Rahul Tonsalkar specialises in treating dandruff, premature greying, alopecia and scalp psoriasis. His evidence-based approach combines dermatology with advanced hair care treatments for lasting results.',
        fees: 500,
        address: { line1: 'HairRevive Trichology Centre, Hadapsar', line2: 'Pune, Maharashtra - 411028' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Meera Pillai',
        email: 'meera.pillai@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Optician',
        degree: 'B.Optom, M.Optom Clinical Optometry',
        experience: '5 Years',
        about: 'Dr. Meera Pillai is a clinical optometrist offering comprehensive eye exams, contact lens fittings, vision therapy and management of conditions like glaucoma and diabetic retinopathy. She is passionate about preventive eye care.',
        fees: 500,
        address: { line1: 'ClearVision Eye Care, Deccan Gymkhana', line2: 'Pune, Maharashtra - 411004' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Vivek Rao',
        email: 'vivek.rao@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Optician',
        degree: 'B.Optom, Diploma in Low Vision Rehabilitation',
        experience: '8 Years',
        about: 'Dr. Vivek Rao specialises in paediatric eye care, myopia management and spectacle prescription. He uses state-of-the-art digital refraction equipment and has a special interest in helping children with vision problems.',
        fees: 600,
        address: { line1: 'EyeWise Optometry Clinic, Viman Nagar', line2: 'Pune, Maharashtra - 411014' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Aarti Bhosale',
        email: 'aarti.bhosale@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Physiotherapist',
        degree: 'BPTh, MPTh Musculoskeletal & Sports',
        experience: '7 Years',
        about: 'Dr. Aarti Bhosale is a musculoskeletal physiotherapist helping patients recover from sports injuries, back pain, frozen shoulder and post-surgical rehabilitation. She uses manual therapy, dry needling and exercise-based recovery.',
        fees: 700,
        address: { line1: 'ActiveCure Physiotherapy, Pimple Saudagar', line2: 'Pune, Maharashtra - 411027' },
        date: Date.now(),
        available: true,
    },
    {
        name: 'Dr. Kiran Patil',
        email: 'kiran.patil@medislot.com',
        password: hashedPass,
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        speciality: 'Physiotherapist',
        degree: 'BPTh, Certified in Neurological Rehabilitation',
        experience: '11 Years',
        about: 'Dr. Kiran Patil is a senior physiotherapist with expertise in neurological rehabilitation for stroke, Parkinson\'s disease, and spinal cord injuries. He brings hope and mobility to patients through personalised rehabilitation plans.',
        fees: 800,
        address: { line1: 'NeuroMove Rehab Centre, Shivajinagar', line2: 'Pune, Maharashtra - 411005' },
        date: Date.now(),
        available: true,
    },
]

// ── Blogs Seed ────────────────────────────────────────────
const blogs = [
    {
        title: '5 Signs You Should See a Counsellor Today',
        content: `Mental health is just as important as physical health, yet most people wait far too long before seeking help. Here are five clear signs it's time to book an appointment with a counsellor.

**1. Persistent Sadness or Anxiety**
If you've been feeling low, hopeless, or overwhelmingly anxious for more than two weeks and it's affecting your daily life — that's your mind asking for help.

**2. Difficulty Managing Relationships**
Constant conflicts at home or work, communication breakdowns, or feeling disconnected from loved ones are strong indicators that professional support can make a difference.

**3. Using Unhealthy Coping Mechanisms**
Turning to alcohol, excessive screen time, overeating or social withdrawal to manage emotions is a sign that you need healthier coping tools — which a counsellor can provide.

**4. You've Experienced Trauma**
Grief, abuse, accidents or any life-altering event can leave deep scars. A counsellor trained in trauma can help you process these experiences safely.

**5. You Simply Feel Stuck**
Sometimes there's no dramatic crisis — you just feel lost, unmotivated or unsure of your direction in life. Counselling helps you reconnect with your purpose.

**Remember:** Seeking help is a sign of strength, not weakness. Book your first session today — it could change everything.`,
        author: 'Dr. Priya Sharma',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        category: 'Counsellor',
    },
    {
        title: 'The Truth About Root Canals — They\'re Not What You Think',
        content: `Root canals have a terrifying reputation — but the reality is very different from the myth. Here's what actually happens during a root canal and why avoiding one is far more painful.

**What Is a Root Canal?**
A root canal is a dental procedure to remove infected pulp (the soft tissue inside your tooth) that's causing pain. Once the pulp is removed, the canal is cleaned, filled, and sealed.

**Does It Hurt?**
No — modern root canals are performed under local anaesthesia and are no more uncomfortable than a routine filling. The pain you feel is from the infection *before* treatment, not the procedure itself.

**How Long Does It Take?**
Most root canals are completed in 1-2 appointments of 60-90 minutes each. With modern rotary instruments and digital X-rays, the process is faster and more precise than ever.

**What Happens If You Ignore It?**
Leaving an infected tooth untreated can lead to severe abscesses, jawbone damage, spreading infection, and ultimately tooth loss. Treatment now saves far more pain, money and teeth in the long run.

**Aftercare Tips:**
- Avoid chewing on the treated tooth until the crown is placed
- Take prescribed antibiotics if given
- Schedule your crown appointment promptly

Don't let fear stop you from getting the dental care you need. Today's dentistry is gentle, precise and virtually pain-free.`,
        author: 'Dr. Sneha Kulkarni',
        image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800',
        category: 'Dentist',
    },
    {
        title: 'Acne in Adults: Why It Happens and How to Actually Fix It',
        content: `Acne isn't just a teenage problem. In fact, adult acne is on the rise — affecting people well into their 40s and 50s. Here's what's causing it and how a dermatologist can help.

**Why Do Adults Get Acne?**
Unlike teenage acne driven by puberty, adult acne is often caused by:
- **Hormonal fluctuations** — especially in women around menstruation, pregnancy, or menopause
- **Stress** — triggers cortisol, which increases oil production
- **Diet** — high glycaemic foods and dairy can worsen breakouts
- **Wrong skincare products** — comedogenic products clog pores

**Over-the-Counter vs. Prescription Treatments**
Most OTC products containing salicylic acid or benzoyl peroxide work for mild acne. But persistent, cystic or hormonal acne requires prescription treatments:
- Topical retinoids (tretinoin)
- Oral antibiotics (short-term)
- Hormonal therapy (spironolactone for women)
- Isotretinoin for severe cases

**What Not to Do**
- Never pop or squeeze pimples — it worsens scarring and inflammation
- Don't over-cleanse — stripping your skin triggers more oil production
- Avoid switching products too frequently — give treatments 8-12 weeks

**When to See a Dermatologist**
If your acne hasn't improved after 8 weeks of consistent OTC treatment, or if you're developing cysts or post-acne scars — book a dermatology appointment immediately.

Professional treatment is tailored to your skin type and hormonal profile, making it far more effective than trial-and-error at the pharmacy.`,
        author: 'Dr. Kavya Nair',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
        category: 'Dermatologist',
    },
    {
        title: 'Hair Fall: 7 Real Reasons Your Hair Is Thinning',
        content: `Losing 50-100 hairs a day is completely normal. But if you're seeing clumps in the shower, bald patches, or visible thinning at the crown — something needs attention.

**1. Androgenetic Alopecia (Genetic Hair Loss)**
The most common cause in both men and women. Hormones (DHT) gradually shrink hair follicles. Early treatment with minoxidil or finasteride can slow and even reverse this.

**2. Nutritional Deficiencies**
Low iron, ferritin, Vitamin D, B12, and zinc are among the top correctable causes of hair fall. A simple blood test can identify these.

**3. Thyroid Disorders**
Both hypothyroidism and hyperthyroidism cause significant hair loss. Once the thyroid is treated, hair usually recovers.

**4. Telogen Effluvium (Stress-Related Shedding)**
A major stressor (illness, surgery, emotional trauma, crash dieting) can push a large number of hairs into the shedding phase 2-3 months later. This is temporary and reversible.

**5. Scalp Conditions**
Dandruff, seborrheic dermatitis, psoriasis, and fungal infections inflame the scalp and disrupt healthy hair growth.

**6. Hairstyling Damage**
Excessive heat, tight hairstyles (traction alopecia), and harsh chemical treatments physically damage and break the hair shaft.

**7. Hormonal Changes**
Post-pregnancy hair loss (postpartum alopecia), PCOS, and menopause all cause hormonal hair fall — usually treatable once hormones stabilise.

**What a Trichologist Does**
A trichologist performs a detailed scalp analysis, hair pull test, and dermatoscopy to identify the exact cause — and creates a personalised treatment plan including PRP, topical treatments or supplements.

Book a hair specialist appointment early — the sooner you treat it, the better the outcome.`,
        author: 'Nisha Verma',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
        category: 'Hair Specialist',
    },
    {
        title: 'How Often Should You Get Your Eyes Tested?',
        content: `Most people only visit an optician when their vision becomes blurry enough to notice — but by then, significant changes may have already occurred. Here's the definitive guide to eye test frequency.

**The General Rule**
- Children (under 16): Every year
- Adults (16-60): Every 2 years
- Adults over 60: Every year
- People with diabetes, glaucoma, or family history of eye disease: Every year or as advised

**What Does an Eye Test Actually Check?**
A comprehensive eye test is about much more than just your prescription. It screens for:
- Glaucoma (silent thief of sight)
- Cataracts
- Macular degeneration
- Diabetic retinopathy
- Signs of high blood pressure and cholesterol

**Warning Signs Not to Ignore**
Book an appointment immediately if you experience:
- Sudden blurring or loss of vision
- Flashes or floaters (especially new ones)
- Eye pain or redness
- Headaches centred around the eyes
- Difficulty seeing at night

**Digital Eye Strain — A Modern Epidemic**
If you spend more than 4 hours a day on screens, follow the **20-20-20 rule**: every 20 minutes, look at something 20 feet away for 20 seconds.

**Children's Eye Health**
Undetected vision problems in children cause learning difficulties, headaches, and behavioural issues — often mistaken for other conditions. Annual screening is critical.

Prevention is always better than cure. Your eyes deserve regular professional attention.`,
        author: 'Dr. Meera Pillai',
        image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800',
        category: 'Optician',
    },
    {
        title: 'Back Pain at Your Desk? A Physiotherapist\'s Complete Fix',
        content: `If you work a desk job, there's a good chance you've experienced back pain, neck stiffness or shoulder tension. You're not alone — it's one of the most common issues physiotherapists treat. Here's how to fix it.

**Why Desk Jobs Destroy Your Back**
Sitting places 140% more pressure on your lumbar discs than standing. Hours of this, combined with poor posture, weak core muscles and no movement — creates the perfect storm for chronic back pain.

**The Physiotherapist-Approved Desk Setup**
- **Monitor height**: Top of screen at eye level
- **Chair height**: Feet flat on floor, knees at 90°
- **Lumbar support**: Small pillow or rolled towel behind lower back
- **Keyboard/mouse**: Elbows at 90°, wrists straight
- **Distance from screen**: Arm's length away

**5 Exercises You Should Do Every Hour**
1. **Chin tucks** — pull chin straight back, hold 5 sec, repeat x10
2. **Shoulder blade squeezes** — pull blades together, hold 5 sec
3. **Seated cat-cow** — arch and round your spine gently x10
4. **Hip flexor stretch** — stand, lunge forward, hold 30 sec each side
5. **Thoracic rotation** — seated, cross arms, rotate each way x10

**When to See a Physiotherapist**
- Pain lasting more than 2 weeks
- Pain radiating down your arm or leg (nerve involvement)
- Numbness or tingling
- Pain disrupting your sleep

A physiotherapist will assess your posture, movement patterns, and muscle imbalances to create a personalised treatment plan — not just manage symptoms but fix the root cause.

Book your session today and take back control of your spine.`,
        author: 'Dr. Aarti Bhosale',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
        category: 'Physiotherapist',
    },
]

// ── Insert Data ───────────────────────────────────────────
console.log('\n📥 Seeding Doctors...')
let insertedDoctors = 0
for (const doc of doctors) {
    try {
        await Doctor.create(doc)
        console.log(`  ✅ ${doc.name} (${doc.speciality})`)
        insertedDoctors++
    } catch (e) {
        if (e.code === 11000) {
            console.log(`  ⚠️  Skipped ${doc.name} — already exists`)
        } else {
            console.log(`  ❌ Failed ${doc.name}: ${e.message}`)
        }
    }
}

console.log('\n📥 Seeding Blogs...')
let insertedBlogs = 0
for (const blog of blogs) {
    try {
        await Blog.create(blog)
        console.log(`  ✅ "${blog.title}"`)
        insertedBlogs++
    } catch (e) {
        console.log(`  ❌ Failed "${blog.title}": ${e.message}`)
    }
}

console.log(`\n🎉 Done! Inserted ${insertedDoctors} doctors & ${insertedBlogs} blogs.`)
await mongoose.disconnect()
process.exit(0)
