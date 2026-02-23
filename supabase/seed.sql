-- Seed data: 150+ US occupations with AI risk scores
-- Based on O*NET/BLS data with curated AI displacement risk scoring

INSERT INTO jobs (onet_code, title, title_aliases, category, description, ai_risk_score, task_automation_score, cognitive_exposure_score, physical_requirement_score, creativity_score, social_intelligence_score, regulatory_barrier_score, median_salary, employment_count, growth_projection) VALUES
-- TECHNOLOGY
('15-1252.00', 'Software Engineer', '{"Software Developer","Programmer","SWE","Coder"}', 'Technology', 'Design, develop, and maintain software applications and systems.', 4.8, 4.5, 6.0, 1.5, 7.0, 5.0, 2.0, 127260, 1847900, 25.7),
('15-1211.00', 'Computer Systems Analyst', '{"Systems Analyst","IT Analyst","Business Systems Analyst"}', 'Technology', 'Analyze and design computer systems for organizations.', 5.2, 5.0, 6.5, 1.5, 5.5, 6.0, 2.0, 102240, 650900, 9.4),
('15-1254.00', 'Web Developer', '{"Frontend Developer","Full Stack Developer","Web Designer"}', 'Technology', 'Design and create websites using coding and design tools.', 5.5, 5.5, 5.5, 1.5, 6.5, 4.0, 1.5, 80730, 216000, 16.0),
('15-1243.00', 'Database Administrator', '{"DBA","Database Manager","Data Administrator"}', 'Technology', 'Administer and maintain database management systems.', 6.3, 6.5, 6.0, 1.5, 4.0, 4.0, 2.5, 101000, 168000, 8.7),
('15-1232.00', 'Computer User Support Specialist', '{"Help Desk","IT Support","Tech Support"}', 'Technology', 'Provide technical assistance to computer users.', 7.1, 7.0, 6.0, 2.0, 3.0, 6.5, 1.5, 57890, 914800, 5.1),
('15-1244.00', 'Network Administrator', '{"Network Engineer","Sysadmin","System Administrator"}', 'Technology', 'Install and maintain computer networks.', 5.0, 5.0, 5.5, 2.5, 4.5, 4.5, 3.0, 90520, 352200, 2.5),
('15-2051.00', 'Data Scientist', '{"ML Engineer","Data Analyst Sr","AI Researcher"}', 'Technology', 'Develop and apply data science methods to solve problems.', 3.8, 3.5, 5.5, 1.5, 7.5, 5.0, 2.0, 108020, 192000, 35.8),
('11-3021.00', 'Computer and Information Systems Manager', '{"IT Director","CTO","IT Manager","VP Engineering"}', 'Technology', 'Plan and coordinate IT activities of an organization.', 3.2, 3.0, 4.5, 1.5, 6.0, 8.0, 3.0, 164070, 509100, 15.4),
('15-1299.08', 'Cybersecurity Analyst', '{"Security Analyst","InfoSec","SOC Analyst"}', 'Technology', 'Protect computer systems and networks from cyber threats.', 3.5, 3.0, 5.0, 1.5, 6.5, 5.0, 4.5, 112000, 175000, 32.0),
('15-2031.00', 'Operations Research Analyst', '{"OR Analyst","Optimization Analyst"}', 'Technology', 'Use mathematical methods to help organizations solve problems.', 5.5, 5.5, 7.0, 1.5, 6.0, 4.5, 2.0, 82360, 104100, 23.1),

-- FINANCE & ACCOUNTING
('13-2011.00', 'Accountant', '{"CPA","Public Accountant","Tax Accountant"}', 'Finance & Accounting', 'Examine and prepare financial records and tax returns.', 7.8, 8.0, 7.5, 1.5, 3.0, 4.5, 5.0, 79880, 1538400, 6.0),
('13-2051.00', 'Financial Analyst', '{"Investment Analyst","Equity Analyst","Finance Analyst"}', 'Finance & Accounting', 'Analyze financial data and make investment recommendations.', 7.4, 7.0, 8.0, 1.5, 4.5, 5.0, 4.0, 96220, 328600, 8.2),
('43-3031.00', 'Bookkeeper', '{"Bookkeeping Clerk","Accounting Clerk","Accounts Payable"}', 'Finance & Accounting', 'Record financial transactions and maintain ledgers.', 8.7, 9.0, 7.0, 1.5, 2.0, 3.0, 2.0, 45860, 1497200, -5.7),
('13-2052.00', 'Personal Financial Advisor', '{"Financial Planner","Wealth Manager","CFP"}', 'Finance & Accounting', 'Advise clients on financial plans and investments.', 4.8, 4.0, 5.5, 1.5, 5.0, 8.5, 6.0, 94170, 330300, 15.0),
('13-2061.00', 'Financial Examiner', '{"Bank Examiner","Compliance Examiner"}', 'Finance & Accounting', 'Enforce compliance with financial laws and regulations.', 5.5, 5.0, 6.0, 1.5, 4.0, 5.5, 7.0, 82210, 67100, 20.5),
('43-3071.00', 'Teller', '{"Bank Teller","Financial Services Teller"}', 'Finance & Accounting', 'Process customer banking transactions.', 8.9, 9.0, 5.0, 2.0, 1.5, 5.5, 3.0, 36310, 470300, -12.4),
('13-2072.00', 'Loan Officer', '{"Mortgage Loan Officer","Loan Originator"}', 'Finance & Accounting', 'Evaluate and authorize loan applications.', 7.0, 7.0, 6.5, 1.5, 3.5, 6.5, 5.0, 69990, 354600, 3.0),
('11-3031.00', 'Financial Manager', '{"Finance Director","Controller","CFO"}', 'Finance & Accounting', 'Direct financial activities of an organization.', 3.8, 3.5, 5.0, 1.5, 5.5, 7.5, 5.0, 139790, 757500, 16.8),

-- HEALTHCARE
('29-1141.00', 'Registered Nurse', '{"RN","Staff Nurse","Clinical Nurse"}', 'Healthcare', 'Assess and treat patients in clinical settings.', 2.1, 2.0, 3.5, 7.5, 4.5, 9.0, 8.0, 81220, 3175390, 5.6),
('29-1224.00', 'Radiologist', '{"Diagnostic Radiologist","Imaging Physician"}', 'Healthcare', 'Diagnose diseases using medical imaging.', 5.8, 5.5, 7.0, 3.0, 5.0, 5.0, 9.0, 301720, 33600, 2.5),
('29-1051.00', 'Pharmacist', '{"Clinical Pharmacist","Retail Pharmacist"}', 'Healthcare', 'Dispense medications and advise on their use.', 5.4, 5.5, 5.0, 3.0, 3.5, 6.5, 8.5, 132750, 330600, -2.2),
('29-1171.00', 'Nurse Practitioner', '{"NP","APRN","Family Nurse Practitioner"}', 'Healthcare', 'Diagnose and treat patients with advanced nursing training.', 2.0, 1.5, 3.5, 7.0, 5.0, 9.0, 8.5, 121610, 355000, 45.7),
('29-1123.00', 'Physical Therapist', '{"PT","Physiotherapist"}', 'Healthcare', 'Help patients recover movement and manage pain.', 1.8, 1.5, 3.0, 8.5, 5.5, 8.5, 7.5, 97720, 258200, 14.7),
('31-1120.00', 'Home Health Aide', '{"Caregiver","Personal Care Aide"}', 'Healthcare', 'Provide personal care for elderly or disabled patients at home.', 1.5, 1.0, 2.0, 8.0, 3.0, 8.0, 4.0, 33530, 3636900, 22.2),
('29-1228.00', 'Physician (General)', '{"Doctor","MD","Primary Care Physician"}', 'Healthcare', 'Diagnose and treat patients, prescribe treatments.', 2.5, 2.0, 4.0, 6.5, 6.0, 9.0, 9.5, 229300, 720000, 3.0),
('29-2034.00', 'Medical Technologist', '{"Lab Tech","Clinical Lab Scientist","MLT"}', 'Healthcare', 'Perform laboratory tests to diagnose diseases.', 5.2, 5.5, 5.0, 4.5, 3.0, 3.5, 5.0, 57380, 338800, 5.2),
('29-1021.00', 'Dentist', '{"General Dentist","DDS","DMD"}', 'Healthcare', 'Diagnose and treat dental conditions.', 2.3, 1.5, 3.0, 8.0, 5.5, 7.5, 9.0, 163220, 155000, 4.3),
('29-1122.00', 'Occupational Therapist', '{"OT","Rehab Therapist"}', 'Healthcare', 'Help patients develop or recover daily living skills.', 1.9, 1.5, 3.5, 7.5, 6.0, 9.0, 7.5, 93180, 143300, 12.1),

-- LEGAL
('23-1011.00', 'Lawyer', '{"Attorney","Counsel","Solicitor","Barrister"}', 'Legal', 'Advise and represent clients in legal matters.', 4.5, 4.0, 6.0, 1.5, 7.0, 8.0, 9.0, 135740, 813900, 8.0),
('23-2011.00', 'Paralegal', '{"Legal Assistant","Litigation Paralegal"}', 'Legal', 'Assist lawyers in preparing legal documents and research.', 7.6, 7.5, 7.5, 1.5, 3.0, 5.0, 4.0, 59200, 352700, 4.0),
('23-1012.00', 'Judicial Law Clerk', '{"Law Clerk","Court Clerk"}', 'Legal', 'Assist judges by researching legal issues and drafting opinions.', 6.8, 6.5, 7.5, 1.5, 4.5, 4.0, 6.0, 57000, 24000, 3.0),
('23-2093.00', 'Title Examiner', '{"Title Searcher","Title Abstractor"}', 'Legal', 'Search legal records to determine property ownership.', 8.3, 8.5, 7.0, 1.5, 2.0, 3.0, 3.5, 51330, 54200, -1.2),

-- MARKETING & SALES
('11-2021.00', 'Marketing Manager', '{"Director of Marketing","Brand Manager","CMO"}', 'Marketing & Sales', 'Plan and direct marketing strategies.', 5.2, 4.5, 5.5, 1.5, 7.5, 7.0, 2.0, 140040, 338800, 6.5),
('41-4012.00', 'Sales Representative', '{"Account Executive","Sales Rep","BDR"}', 'Marketing & Sales', 'Sell products and services to businesses or consumers.', 5.8, 5.0, 4.5, 3.0, 5.0, 8.0, 2.0, 62890, 1584700, 1.5),
('13-1161.00', 'Market Research Analyst', '{"Market Analyst","Consumer Insights","Research Analyst"}', 'Marketing & Sales', 'Research market conditions to examine sales potential.', 6.8, 6.5, 7.0, 1.5, 5.0, 4.5, 2.0, 68230, 906200, 13.0),
('27-3031.00', 'Public Relations Specialist', '{"PR Specialist","Communications Specialist","PR Manager"}', 'Marketing & Sales', 'Create and maintain a favorable public image.', 5.0, 4.5, 5.0, 1.5, 7.0, 8.0, 2.0, 67440, 279800, 6.3),
('41-3011.00', 'Advertising Sales Agent', '{"Ad Sales","Media Sales","Account Manager"}', 'Marketing & Sales', 'Sell advertising space and time.', 6.5, 6.0, 5.0, 2.0, 4.5, 7.5, 1.5, 58450, 118800, -7.5),
('41-9022.00', 'Real Estate Agent', '{"Realtor","Real Estate Broker","Property Agent"}', 'Real Estate', 'Help clients buy, sell, or rent properties.', 5.6, 4.5, 4.5, 3.5, 5.0, 8.5, 5.0, 52030, 170500, 5.2),

-- EDUCATION
('25-2031.00', 'Teacher (K-12)', '{"Elementary Teacher","High School Teacher","Educator"}', 'Education', 'Instruct students in academic and social subjects.', 2.8, 2.5, 3.5, 4.0, 7.0, 9.5, 7.0, 60660, 3500000, 1.0),
('25-1099.00', 'University Professor', '{"Professor","Academic","Lecturer","Faculty"}', 'Education', 'Teach and conduct research at postsecondary institutions.', 3.5, 3.0, 4.5, 2.0, 8.5, 7.5, 6.0, 80840, 1364000, 7.8),
('25-2011.00', 'Preschool Teacher', '{"Pre-K Teacher","Early Childhood Educator"}', 'Education', 'Instruct preschool-aged children in activities.', 1.5, 1.0, 2.0, 6.0, 7.0, 9.5, 5.0, 35330, 479000, 10.7),
('25-3098.00', 'Corporate Trainer', '{"Training Specialist","L&D Specialist","Instructional Designer"}', 'Education', 'Design and deliver training programs for organizations.', 5.5, 5.0, 5.5, 2.0, 6.0, 7.5, 2.0, 63080, 369000, 6.1),
('25-4022.00', 'Librarian', '{"Library Scientist","Information Specialist"}', 'Education', 'Organize information resources and assist patrons.', 6.0, 6.0, 5.5, 2.5, 4.5, 6.5, 3.0, 61190, 138200, 3.5),

-- ENGINEERING
('17-2141.00', 'Mechanical Engineer', '{"Design Engineer","Product Engineer","ME"}', 'Engineering', 'Design and develop mechanical devices and systems.', 3.9, 3.5, 5.0, 3.0, 7.5, 5.0, 5.0, 96310, 299200, 2.0),
('17-2071.00', 'Electrical Engineer', '{"EE","Power Engineer","Electronics Engineer"}', 'Engineering', 'Design and develop electrical equipment and systems.', 4.0, 3.5, 5.0, 3.0, 7.0, 5.0, 5.0, 104610, 188300, 2.7),
('17-2051.00', 'Civil Engineer', '{"Structural Engineer","Infrastructure Engineer"}', 'Engineering', 'Design and supervise construction of infrastructure.', 3.5, 3.0, 4.5, 4.0, 6.5, 6.0, 7.0, 89940, 326800, 5.4),
('17-2112.00', 'Industrial Engineer', '{"Process Engineer","Manufacturing Engineer","IE"}', 'Engineering', 'Design efficient systems for production and operations.', 4.5, 4.5, 5.5, 2.5, 6.0, 5.5, 3.5, 95300, 303400, 12.0),
('17-2199.00', 'Biomedical Engineer', '{"Biomedical","Medical Device Engineer"}', 'Engineering', 'Design medical devices and biological systems.', 3.0, 2.5, 4.5, 3.5, 8.0, 5.5, 6.5, 99550, 22200, 5.1),

-- ADMINISTRATIVE
('43-9021.00', 'Data Entry Clerk', '{"Data Entry Operator","Typist","Data Processor"}', 'Administrative', 'Enter data into computer systems from various sources.', 9.2, 9.5, 5.0, 1.5, 1.0, 2.0, 1.0, 35850, 158600, -25.6),
('43-4051.00', 'Customer Service Representative', '{"CSR","Call Center Agent","Support Agent"}', 'Administrative', 'Handle customer inquiries and resolve complaints.', 8.5, 8.0, 5.5, 1.5, 2.5, 7.0, 2.0, 37780, 2894470, -4.5),
('43-6011.00', 'Executive Assistant', '{"Admin Assistant","Executive Secretary","EA"}', 'Administrative', 'Provide high-level administrative support to executives.', 7.2, 7.0, 5.5, 1.5, 4.0, 7.0, 2.0, 65980, 580600, -8.6),
('43-6014.00', 'Secretary', '{"Administrative Secretary","Office Secretary"}', 'Administrative', 'Perform routine clerical and administrative functions.', 8.0, 8.0, 5.0, 1.5, 2.5, 5.0, 1.5, 39680, 1840000, -8.5),
('43-1011.00', 'Office Manager', '{"Administrative Manager","Office Administrator"}', 'Administrative', 'Plan and coordinate administrative activities of an office.', 5.5, 5.0, 4.5, 2.0, 5.0, 7.0, 2.5, 57960, 305800, 5.8),
('43-5071.00', 'Shipping and Receiving Clerk', '{"Warehouse Clerk","Logistics Clerk"}', 'Administrative', 'Verify and record incoming and outgoing shipments.', 7.5, 7.5, 3.5, 5.5, 1.5, 3.0, 1.5, 36710, 614200, -3.5),

-- TRANSPORTATION
('53-3032.00', 'Truck Driver', '{"CDL Driver","Long Haul Driver","Delivery Driver"}', 'Transportation', 'Drive trucks to transport materials and goods.', 6.9, 6.0, 3.0, 6.0, 2.0, 3.5, 5.0, 49920, 2121300, 4.0),
('53-3054.00', 'Taxi Driver', '{"Ride Share Driver","Uber Driver","Chauffeur"}', 'Transportation', 'Drive passengers to requested destinations.', 7.8, 7.0, 2.5, 5.0, 1.5, 5.0, 4.0, 33680, 178000, 6.3),
('53-2011.00', 'Airline Pilot', '{"Commercial Pilot","Captain","First Officer"}', 'Transportation', 'Navigate and fly aircraft for commercial airlines.', 4.0, 3.5, 4.5, 3.5, 4.0, 5.0, 9.0, 211790, 103000, 6.0),
('53-4011.00', 'Locomotive Engineer', '{"Train Engineer","Train Operator"}', 'Transportation', 'Drive trains to transport passengers and freight.', 6.5, 6.0, 3.5, 4.5, 2.0, 3.5, 6.0, 72940, 56100, -5.0),

-- MANUFACTURING
('11-3071.00', 'Supply Chain Manager', '{"Logistics Manager","Procurement Manager","SCM"}', 'Manufacturing', 'Coordinate supply chain activities for an organization.', 5.1, 5.0, 5.5, 2.0, 5.5, 6.5, 3.0, 98560, 211600, 18.0),
('51-1011.00', 'Production Supervisor', '{"Manufacturing Supervisor","Plant Supervisor","Floor Manager"}', 'Manufacturing', 'Supervise production workers in manufacturing.', 4.0, 3.5, 3.5, 5.5, 4.5, 7.5, 3.5, 62090, 560000, 1.2),
('51-4121.00', 'Welder', '{"Welding Technician","Fabricator"}', 'Manufacturing', 'Join metal parts using welding equipment.', 3.5, 3.0, 2.5, 8.5, 4.0, 3.0, 4.0, 47540, 427300, 2.2),
('51-9061.00', 'Quality Inspector', '{"QA Inspector","Quality Control","QC Technician"}', 'Manufacturing', 'Inspect products and materials for defects.', 6.5, 6.5, 4.5, 4.5, 3.0, 3.5, 4.0, 43200, 463600, -3.2),
('17-3026.00', 'Industrial Engineering Technician', '{"Manufacturing Tech","Process Tech"}', 'Manufacturing', 'Apply engineering principles to plan manufacturing processes.', 5.8, 5.5, 5.0, 4.0, 4.5, 4.5, 3.0, 60220, 69200, 1.5),

-- CREATIVE & MEDIA
('27-1024.00', 'Graphic Designer', '{"Visual Designer","UI Designer","Brand Designer"}', 'Creative & Media', 'Create visual concepts to communicate ideas.', 6.5, 6.0, 5.5, 1.5, 8.0, 5.0, 1.5, 57990, 281500, 2.7),
('27-3043.00', 'Content Writer', '{"Copywriter","Technical Writer","Blogger","Content Creator"}', 'Creative & Media', 'Write content for various media and publications.', 7.8, 7.5, 7.5, 1.5, 7.0, 4.0, 1.0, 73150, 145000, -2.0),
('27-2012.00', 'Film Producer', '{"TV Producer","Video Producer","Executive Producer"}', 'Creative & Media', 'Plan and coordinate production of films and TV shows.', 3.5, 2.5, 3.5, 3.0, 8.5, 8.5, 2.5, 82510, 138000, 6.3),
('27-1014.00', 'Special Effects Artist', '{"VFX Artist","3D Artist","CGI Artist"}', 'Creative & Media', 'Create visual effects for films, TV, and games.', 5.0, 4.5, 5.0, 1.5, 8.5, 4.0, 1.5, 78790, 72000, 5.5),
('27-3041.00', 'Editor', '{"Copy Editor","Managing Editor","Content Editor"}', 'Creative & Media', 'Plan and coordinate content for publications.', 6.5, 6.0, 6.5, 1.5, 7.0, 5.5, 1.5, 73080, 118000, -5.8),
('27-1011.00', 'Art Director', '{"Creative Director","Design Director"}', 'Creative & Media', 'Direct visual style and images in various media.', 4.0, 3.5, 4.0, 1.5, 9.0, 7.5, 1.5, 104590, 100000, 5.0),
('27-4021.00', 'Photographer', '{"Commercial Photographer","Photo Journalist"}', 'Creative & Media', 'Photograph people, events, and objects.', 4.5, 3.5, 3.5, 4.0, 8.5, 6.0, 1.5, 40070, 68000, 4.4),
('27-2041.00', 'Music Director', '{"Conductor","Composer","Music Producer"}', 'Creative & Media', 'Direct and create musical performances and compositions.', 3.0, 2.0, 3.0, 3.0, 9.5, 7.0, 2.0, 62940, 77000, 5.7),

-- SCIENCE & RESEARCH
('19-1042.00', 'Medical Scientist', '{"Research Scientist","Biomedical Researcher"}', 'Science & Research', 'Conduct research on human diseases and conditions.', 3.2, 2.5, 4.5, 4.5, 8.0, 5.0, 5.5, 100890, 133900, 10.4),
('19-2031.00', 'Chemist', '{"Chemical Analyst","Lab Chemist","Analytical Chemist"}', 'Science & Research', 'Conduct chemical analysis and experiments.', 4.5, 4.0, 5.0, 5.0, 7.0, 4.0, 4.5, 82190, 86300, 5.9),
('19-1031.00', 'Conservation Scientist', '{"Environmental Scientist","Ecologist"}', 'Science & Research', 'Manage and protect natural resources.', 2.8, 2.0, 3.5, 6.0, 6.0, 6.0, 5.0, 64010, 42600, 5.1),
('19-4099.00', 'Laboratory Technician', '{"Lab Tech","Research Assistant","Lab Assistant"}', 'Science & Research', 'Assist scientists with laboratory experiments and analysis.', 5.8, 5.5, 4.5, 5.0, 3.5, 3.5, 3.5, 48380, 260000, 5.0),
('19-3011.00', 'Economist', '{"Economic Analyst","Policy Economist","Research Economist"}', 'Science & Research', 'Study economic data and trends to make forecasts.', 6.2, 6.0, 7.5, 1.5, 6.5, 4.5, 3.0, 113940, 19600, 6.2),

-- HUMAN RESOURCES
('13-1071.00', 'HR Specialist', '{"HR Coordinator","Human Resources Generalist","People Ops"}', 'Human Resources', 'Recruit, screen, and interview job applicants.', 6.2, 5.5, 5.5, 1.5, 4.0, 8.0, 4.0, 64240, 782800, 6.0),
('11-3121.00', 'HR Manager', '{"Director of HR","VP People","Head of HR","CHRO"}', 'Human Resources', 'Plan and coordinate human resource activities.', 4.0, 3.5, 4.5, 1.5, 5.5, 9.0, 5.0, 130000, 188400, 5.0),
('13-1151.00', 'Training and Development Specialist', '{"Corporate Trainer","L&D Manager"}', 'Human Resources', 'Plan and conduct programs to improve skills and knowledge.', 5.0, 4.5, 5.0, 2.0, 6.5, 8.0, 2.5, 63080, 369000, 6.1),
('13-1141.00', 'Compensation Analyst', '{"Comp and Benefits Analyst","Total Rewards"}', 'Human Resources', 'Analyze compensation data and manage benefit programs.', 7.0, 7.0, 6.5, 1.5, 3.5, 5.0, 4.0, 67780, 88100, 1.5),

-- INSURANCE
('13-2053.00', 'Insurance Underwriter', '{"Commercial Underwriter","Risk Underwriter"}', 'Insurance', 'Evaluate insurance applications and determine coverage.', 8.1, 8.0, 7.5, 1.5, 3.0, 4.5, 5.0, 77860, 114800, -2.2),
('41-3021.00', 'Insurance Sales Agent', '{"Insurance Broker","Life Insurance Agent"}', 'Insurance', 'Sell insurance products to clients.', 5.5, 4.5, 4.0, 2.0, 4.5, 8.0, 5.0, 57860, 539500, 6.0),
('13-1032.00', 'Claims Adjuster', '{"Claims Examiner","Insurance Claims","Claims Analyst"}', 'Insurance', 'Investigate and settle insurance claims.', 7.5, 7.0, 6.5, 2.5, 3.5, 6.0, 5.0, 72040, 296000, -6.0),

-- CONSTRUCTION
('47-2111.00', 'Electrician', '{"Electrical Contractor","Journeyman Electrician"}', 'Construction', 'Install and maintain electrical systems.', 2.5, 2.0, 3.0, 8.5, 5.0, 4.0, 6.0, 60240, 739200, 6.0),
('47-2152.00', 'Plumber', '{"Pipefitter","Plumbing Contractor"}', 'Construction', 'Install and repair piping and plumbing systems.', 2.2, 1.5, 2.5, 9.0, 5.0, 4.0, 6.0, 59880, 496000, 1.6),
('47-2031.00', 'Carpenter', '{"Framer","Finish Carpenter","Woodworker"}', 'Construction', 'Construct and repair building frameworks and structures.', 2.5, 2.0, 2.5, 9.0, 5.5, 3.5, 3.5, 52640, 723000, 2.1),
('11-9021.00', 'Construction Manager', '{"General Contractor","Site Manager","Project Manager Construction"}', 'Construction', 'Plan and oversee construction projects.', 3.0, 2.5, 3.5, 5.0, 5.5, 8.0, 6.0, 101480, 540000, 5.0),
('47-2073.00', 'HVAC Technician', '{"HVAC Installer","AC Technician","Heating Mechanic"}', 'Construction', 'Install and repair heating, ventilation, and AC systems.', 2.3, 1.5, 2.5, 9.0, 4.5, 4.5, 5.0, 51390, 401300, 5.5),

-- FOOD SERVICE
('35-1012.00', 'Restaurant Manager', '{"Food Service Manager","Kitchen Manager","GM Restaurant"}', 'Food Service', 'Plan and direct food service operations.', 3.5, 3.0, 3.0, 5.0, 5.0, 8.5, 4.5, 61310, 356400, 10.0),
('35-2014.00', 'Chef', '{"Executive Chef","Sous Chef","Head Cook"}', 'Food Service', 'Direct food preparation and cooking activities.', 2.8, 2.0, 2.5, 7.5, 8.0, 6.0, 3.0, 56520, 163000, 5.5),
('35-3023.00', 'Fast Food Worker', '{"Crew Member","Counter Worker","Fast Food Cashier"}', 'Food Service', 'Prepare and serve food in fast food restaurants.', 7.5, 7.0, 2.0, 5.5, 1.0, 4.0, 1.0, 27400, 3650000, 6.2),
('35-2021.00', 'Food Preparation Worker', '{"Prep Cook","Kitchen Helper","Food Handler"}', 'Food Service', 'Prepare ingredients for cooks and chefs.', 6.8, 6.5, 2.0, 6.5, 2.0, 3.0, 1.0, 31080, 832100, 3.2),

-- RETAIL
('41-2031.00', 'Retail Salesperson', '{"Sales Associate","Store Clerk","Retail Associate"}', 'Retail', 'Sell merchandise to customers in retail settings.', 7.0, 6.5, 3.5, 4.0, 2.5, 6.5, 1.5, 30750, 4180000, -0.3),
('41-2011.00', 'Cashier', '{"Checkout Clerk","Register Operator"}', 'Retail', 'Process customer purchases at checkout.', 8.8, 9.0, 2.5, 3.5, 1.0, 4.5, 1.0, 28240, 3338000, -9.5),
('11-9061.00', 'Store Manager', '{"Retail Manager","Branch Manager","Shop Manager"}', 'Retail', 'Manage daily operations of a retail store.', 4.5, 4.0, 4.0, 3.5, 5.0, 8.0, 3.0, 47270, 1166000, 1.2),

-- GOVERNMENT & PUBLIC SERVICE
('33-3051.00', 'Police Officer', '{"Law Enforcement Officer","Patrol Officer","Cop"}', 'Government', 'Maintain law and order and protect citizens.', 2.5, 2.0, 3.0, 7.5, 5.0, 8.0, 8.0, 65790, 665380, 3.5),
('33-2011.00', 'Firefighter', '{"Fire Fighter","EMT-Firefighter"}', 'Government', 'Respond to fires and emergency situations.', 1.5, 1.0, 2.0, 9.5, 4.0, 7.0, 7.0, 52500, 319800, 4.0),
('21-1021.00', 'Social Worker', '{"Clinical Social Worker","Case Manager","LCSW"}', 'Government', 'Help people cope with social and psychological problems.', 2.5, 2.0, 3.5, 3.0, 5.5, 9.5, 6.5, 55350, 708100, 7.2),
('21-1012.00', 'School Counselor', '{"Guidance Counselor","Academic Advisor"}', 'Government', 'Advise students on academic and personal matters.', 2.2, 1.5, 3.0, 2.5, 5.5, 9.5, 5.5, 61710, 328000, 5.1),
('13-2081.00', 'Tax Examiner', '{"Tax Auditor","Revenue Agent","IRS Agent"}', 'Government', 'Determine tax liability and collect taxes.', 7.2, 7.0, 6.5, 1.5, 3.0, 5.0, 7.0, 57530, 56100, -5.1),

-- AGRICULTURE
('45-2093.00', 'Farmworker', '{"Farm Laborer","Agricultural Worker","Ranch Hand"}', 'Agriculture', 'Manually plant, cultivate, and harvest crops.', 4.5, 4.0, 1.5, 9.0, 2.0, 3.0, 2.0, 30940, 1044000, 1.0),
('11-9013.00', 'Farm Manager', '{"Ranch Manager","Agricultural Manager"}', 'Agriculture', 'Plan and coordinate farming operations.', 3.2, 3.0, 3.5, 6.5, 5.5, 6.0, 4.0, 73060, 297000, 1.0),
('19-1013.00', 'Soil Scientist', '{"Agronomist","Soil Conservationist"}', 'Agriculture', 'Study soil composition and properties for agriculture.', 3.5, 3.0, 4.0, 5.5, 6.5, 4.0, 4.0, 63680, 12500, 3.5),

-- ADDITIONAL HIGH-DEMAND ROLES
('15-1256.00', 'UX Designer', '{"User Experience Designer","Product Designer","UX Researcher"}', 'Technology', 'Research and design user interfaces and experiences.', 4.2, 3.5, 4.5, 1.5, 8.5, 7.0, 1.5, 82500, 185000, 16.0),
('15-1299.09', 'DevOps Engineer', '{"Site Reliability Engineer","SRE","Platform Engineer"}', 'Technology', 'Build and maintain deployment infrastructure and CI/CD pipelines.', 4.5, 4.5, 5.5, 1.5, 6.0, 4.5, 2.5, 120000, 120000, 22.0),
('15-2098.00', 'AI/ML Engineer', '{"Machine Learning Engineer","AI Developer","Deep Learning Engineer"}', 'Technology', 'Design and build artificial intelligence systems.', 3.0, 2.5, 5.0, 1.5, 8.0, 4.5, 2.0, 145000, 75000, 40.0),
('13-1111.00', 'Management Consultant', '{"Strategy Consultant","Business Consultant","McKinsey Consultant"}', 'Finance & Accounting', 'Advise organizations on strategy and operations.', 4.8, 4.5, 6.0, 1.5, 7.0, 8.0, 2.5, 99410, 989100, 11.1),
('11-1011.00', 'CEO', '{"Chief Executive Officer","President","Managing Director","Founder"}', 'Government', 'Determine and formulate policies for organizations.', 2.5, 2.0, 3.5, 2.0, 8.0, 9.5, 4.0, 189520, 200000, 3.0),
('11-2022.00', 'Sales Manager', '{"VP Sales","Director of Sales","Head of Sales"}', 'Marketing & Sales', 'Direct sales teams and develop sales strategies.', 4.0, 3.5, 4.5, 2.0, 6.0, 9.0, 2.5, 130600, 469800, 4.0),
('29-1031.00', 'Dietitian', '{"Nutritionist","Clinical Dietitian","Registered Dietitian"}', 'Healthcare', 'Plan and conduct food service and nutrition programs.', 3.5, 3.0, 4.0, 3.0, 5.0, 8.0, 6.0, 66450, 77400, 7.1),
('21-1014.00', 'Mental Health Counselor', '{"Therapist","Psychotherapist","LMHC","LPC"}', 'Healthcare', 'Counsel individuals and groups for mental health issues.', 1.8, 1.0, 3.0, 2.0, 6.0, 9.8, 7.0, 53710, 356000, 18.3),
('29-1031.00', 'Veterinarian', '{"Vet","Animal Doctor","DVM"}', 'Healthcare', 'Diagnose and treat diseases and injuries in animals.', 2.0, 1.5, 3.0, 7.5, 5.5, 7.0, 8.5, 119100, 86800, 19.0),
('25-9031.00', 'Tutor', '{"Academic Tutor","Private Tutor","Online Tutor"}', 'Education', 'Provide individualized academic instruction.', 5.5, 5.0, 5.5, 2.0, 6.0, 8.0, 2.0, 39050, 100000, 5.0),
('13-1199.06', 'Compliance Officer', '{"Compliance Manager","Regulatory Analyst","Compliance Analyst"}', 'Finance & Accounting', 'Ensure organizational compliance with regulations.', 5.8, 5.5, 6.0, 1.5, 4.0, 6.0, 7.5, 75050, 346700, 4.6),
('27-2022.00', 'Athletic Coach', '{"Sports Coach","Fitness Coach","Personal Trainer"}', 'Education', 'Instruct or coach groups or individuals in sports.', 1.8, 1.5, 2.0, 7.0, 6.0, 9.0, 3.0, 44890, 308000, 12.3),
('11-9111.00', 'Medical and Health Services Manager', '{"Hospital Administrator","Healthcare Manager","Clinical Director"}', 'Healthcare', 'Plan and direct medical and health services.', 3.0, 2.5, 4.0, 2.5, 5.5, 8.5, 7.0, 104830, 480700, 28.3),
('29-1127.00', 'Speech-Language Pathologist', '{"Speech Therapist","SLP"}', 'Healthcare', 'Assess and treat speech and language disorders.', 1.8, 1.5, 3.0, 4.5, 6.0, 9.5, 7.0, 84140, 161000, 19.4),
('53-7065.00', 'Warehouse Worker', '{"Warehouse Associate","Picker","Stock Clerk"}', 'Manufacturing', 'Load, unload, and move materials in warehouses.', 7.0, 7.0, 2.0, 7.5, 1.0, 2.5, 1.5, 33980, 1800000, 4.5),
('49-9071.00', 'HVAC Mechanic', '{"Refrigeration Mechanic","AC Repair Tech"}', 'Construction', 'Maintain and repair heating and cooling systems.', 2.5, 2.0, 2.5, 8.5, 4.5, 4.0, 5.5, 51390, 401300, 5.5),
('39-5012.00', 'Hairdresser', '{"Hair Stylist","Cosmetologist","Barber"}', 'Retail', 'Cut, style, and treat hair and provide beauty services.', 2.0, 1.5, 1.5, 7.5, 7.0, 8.0, 5.0, 33400, 679000, 7.0),
('21-1093.00', 'Social Service Assistant', '{"Case Aide","Eligibility Worker","Benefits Specialist"}', 'Government', 'Assist social workers in providing services.', 5.5, 5.0, 4.5, 2.5, 3.5, 7.5, 4.0, 37610, 386600, 12.0),
('43-4171.00', 'Receptionist', '{"Front Desk","Office Receptionist","Front Desk Agent"}', 'Administrative', 'Greet visitors and handle incoming communications.', 8.2, 8.0, 4.0, 2.0, 2.0, 6.0, 1.5, 33960, 1005000, -5.0),
('11-9199.00', 'Project Manager', '{"Program Manager","PM","Scrum Master","PMP"}', 'Technology', 'Plan, coordinate, and oversee projects from inception to completion.', 4.2, 3.5, 4.5, 1.5, 5.5, 8.5, 2.5, 98580, 900000, 6.5),
('13-2082.00', 'Tax Preparer', '{"Tax Professional","Tax Advisor","H&R Block"}', 'Finance & Accounting', 'Prepare tax returns for individuals and businesses.', 8.5, 8.5, 7.0, 1.5, 2.5, 5.0, 4.0, 46290, 63300, -3.0),
('27-3042.00', 'Social Media Manager', '{"Community Manager","Digital Marketing Specialist"}', 'Marketing & Sales', 'Manage and create content for social media platforms.', 6.0, 5.5, 5.0, 1.5, 7.5, 6.5, 1.0, 61500, 175000, 10.0),
('15-1253.00', 'Software Quality Assurance', '{"QA Engineer","Test Engineer","SDET"}', 'Technology', 'Test software applications and identify bugs.', 6.8, 7.0, 6.0, 1.5, 4.0, 4.0, 2.0, 98220, 200000, 20.0),
('13-1023.00', 'Purchasing Agent', '{"Buyer","Procurement Specialist","Purchasing Manager"}', 'Manufacturing', 'Buy products and services for organizations.', 6.5, 6.5, 5.5, 1.5, 3.5, 6.0, 3.0, 63470, 313200, -4.3),
('33-9032.00', 'Security Guard', '{"Security Officer","Night Watchman","Loss Prevention"}', 'Government', 'Guard and patrol property against theft and vandalism.', 5.5, 4.5, 2.0, 6.5, 1.5, 5.5, 3.5, 33150, 1156000, 3.0),
('47-4011.00', 'Construction Laborer', '{"General Laborer","Construction Worker","Helper"}', 'Construction', 'Perform tasks at construction sites.', 3.8, 3.0, 1.5, 9.5, 2.0, 3.5, 2.0, 39520, 863000, 4.0),
('49-3023.00', 'Automotive Mechanic', '{"Auto Tech","Car Mechanic","Automotive Technician"}', 'Construction', 'Inspect, maintain, and repair automobiles.', 3.0, 2.5, 3.0, 8.0, 5.0, 4.5, 4.0, 46880, 779000, 1.0),
('31-9091.00', 'Dental Hygienist', '{"RDH","Dental Therapist"}', 'Healthcare', 'Clean teeth and examine oral areas for disease.', 2.5, 2.0, 2.5, 6.5, 3.5, 7.0, 7.0, 81400, 226600, 7.2),
('13-1081.00', 'Logistics Analyst', '{"Supply Chain Analyst","Transportation Analyst"}', 'Manufacturing', 'Analyze and coordinate transportation logistics.', 6.0, 6.0, 6.0, 1.5, 4.0, 5.0, 2.5, 77520, 194200, 18.0),
('29-2061.00', 'Licensed Practical Nurse', '{"LPN","LVN","Licensed Vocational Nurse"}', 'Healthcare', 'Provide basic nursing care under RN supervision.', 3.0, 2.5, 3.0, 7.0, 3.5, 7.5, 6.5, 55860, 676440, 5.3),
('39-9011.00', 'Child Care Worker', '{"Babysitter","Daycare Worker","Nanny"}', 'Education', 'Attend to children at schools, businesses, and institutions.', 1.5, 1.0, 2.0, 6.5, 5.5, 9.0, 4.0, 28520, 593000, 5.2),
('11-3013.00', 'Facilities Manager', '{"Building Manager","Property Manager"}', 'Construction', 'Plan and coordinate facility operations and maintenance.', 3.5, 3.0, 3.5, 4.5, 4.5, 7.0, 4.0, 99290, 171000, 6.0),
('13-2041.00', 'Credit Analyst', '{"Credit Risk Analyst","Lending Analyst"}', 'Finance & Accounting', 'Analyze credit data to estimate degree of risk.', 7.5, 7.5, 7.5, 1.5, 3.5, 4.5, 4.5, 76490, 79000, 3.5),
('17-1011.00', 'Architect', '{"Building Architect","Design Architect","Licensed Architect"}', 'Engineering', 'Plan and design buildings and structures.', 3.8, 3.0, 4.5, 3.0, 9.0, 6.5, 7.5, 93310, 129900, 3.0),
('29-2099.00', 'Surgical Technologist', '{"Surgical Tech","OR Tech","Scrub Tech"}', 'Healthcare', 'Assist in surgical operations under direction of surgeons.', 2.8, 2.0, 3.0, 7.5, 3.0, 5.5, 6.0, 56350, 119200, 5.6),
('43-3011.00', 'Bill Collector', '{"Debt Collector","Collections Agent","Recovery Specialist"}', 'Finance & Accounting', 'Contact debtors to collect payments on overdue accounts.', 8.0, 7.5, 5.0, 1.5, 2.0, 6.0, 4.0, 38040, 263000, -7.5),
('27-4032.00', 'Film Editor', '{"Video Editor","Post Production Editor"}', 'Creative & Media', 'Edit moving images for films, TV, and other media.', 5.5, 5.0, 5.0, 1.5, 8.0, 4.0, 1.5, 62500, 38000, 6.3),
('49-9021.00', 'HVAC Installer', '{"Heating Installer","AC Installer"}', 'Construction', 'Install heating, ventilation, and air conditioning systems.', 2.3, 1.5, 2.5, 9.0, 3.5, 3.5, 5.0, 51390, 401300, 5.5),
('11-9033.00', 'Education Administrator', '{"School Principal","Dean","Superintendent"}', 'Education', 'Plan and coordinate educational institution activities.', 2.8, 2.5, 3.5, 2.5, 5.5, 9.0, 6.5, 99820, 282000, 4.0),
('15-1241.00', 'Computer Network Architect', '{"Network Architect","Solutions Architect","Cloud Architect"}', 'Technology', 'Design and build data communication networks.', 3.8, 3.5, 5.0, 1.5, 7.0, 5.5, 3.5, 126900, 180000, 4.0),
('41-1011.00', 'Retail Sales Supervisor', '{"Department Manager","Floor Supervisor","Shift Lead"}', 'Retail', 'Supervise retail sales workers.', 4.5, 4.0, 3.5, 3.5, 4.5, 7.5, 2.0, 44980, 1500000, 1.0),
('29-1292.00', 'Psychiatrist', '{"Mental Health Physician","Psychiatric Doctor"}', 'Healthcare', 'Diagnose and treat mental disorders.', 2.0, 1.5, 3.5, 2.0, 6.0, 9.8, 9.5, 247350, 27000, 6.5),
('13-1028.00', 'Product Manager', '{"Technical PM","Product Owner","TPM"}', 'Technology', 'Plan product strategy and manage development lifecycle.', 4.0, 3.5, 5.0, 1.5, 7.0, 8.0, 2.0, 130000, 350000, 12.0)
ON CONFLICT (onet_code) DO UPDATE SET
  title = EXCLUDED.title,
  title_aliases = EXCLUDED.title_aliases,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  ai_risk_score = EXCLUDED.ai_risk_score,
  task_automation_score = EXCLUDED.task_automation_score,
  cognitive_exposure_score = EXCLUDED.cognitive_exposure_score,
  physical_requirement_score = EXCLUDED.physical_requirement_score,
  creativity_score = EXCLUDED.creativity_score,
  social_intelligence_score = EXCLUDED.social_intelligence_score,
  regulatory_barrier_score = EXCLUDED.regulatory_barrier_score,
  median_salary = EXCLUDED.median_salary,
  employment_count = EXCLUDED.employment_count,
  growth_projection = EXCLUDED.growth_projection,
  last_updated = NOW();
