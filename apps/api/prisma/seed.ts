import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        birthDate: new Date('1990-01-01'),
        phoneNumber: '1234567890',
        jobTitle: 'Software Engineer',
        department: 'Engineering',
        employmentType: 'Full-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2023-01-01T10:00:00Z'),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        birthDate: new Date('1985-05-15'),
        phoneNumber: '0987654321',
        jobTitle: 'Product Manager',
        department: 'Product',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2023-02-01T10:00:00Z'),
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        birthDate: new Date('1992-07-20'),
        phoneNumber: '1122334455',
        jobTitle: 'UX Designer',
        department: 'Design',
        employmentType: 'Part-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2023-03-01T10:00:00Z'),
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        birthDate: new Date('1988-03-14'),
        phoneNumber: '2233445566',
        jobTitle: 'DevOps Engineer',
        department: 'Engineering',
        employmentType: 'Full-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2023-04-01T10:00:00Z'),
      },
      {
        firstName: 'Charlie',
        lastName: 'Davis',
        email: 'charlie.davis@example.com',
        birthDate: new Date('1995-11-30'),
        phoneNumber: '3344556677',
        jobTitle: 'Marketing Specialist',
        department: 'Marketing',
        employmentType: 'Contract',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2023-05-01T10:00:00Z'),
      },
      {
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@example.com',
        birthDate: new Date('1991-04-22'),
        phoneNumber: '4455667788',
        jobTitle: 'Data Scientist',
        department: 'Data',
        employmentType: 'Full-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2023-06-01T10:00:00Z'),
      },
      {
        firstName: 'Emma',
        lastName: 'Thomas',
        email: 'emma.thomas@example.com',
        birthDate: new Date('1987-09-10'),
        phoneNumber: '5566778899',
        jobTitle: 'HR Manager',
        department: 'Human Resources',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2023-07-01T10:00:00Z'),
      },
      {
        firstName: 'Frank',
        lastName: 'White',
        email: 'frank.white@example.com',
        birthDate: new Date('1993-12-05'),
        phoneNumber: '6677889900',
        jobTitle: 'Sales Executive',
        department: 'Sales',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2023-08-01T10:00:00Z'),
      },
      {
        firstName: 'Grace',
        lastName: 'Harris',
        email: 'grace.harris@example.com',
        birthDate: new Date('1989-06-18'),
        phoneNumber: '7788990011',
        jobTitle: 'Customer Support',
        department: 'Support',
        employmentType: 'Part-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2023-09-01T10:00:00Z'),
      },
      {
        firstName: 'Henry',
        lastName: 'Martin',
        email: 'henry.martin@example.com',
        birthDate: new Date('1994-02-25'),
        phoneNumber: '8899001122',
        jobTitle: 'Finance Analyst',
        department: 'Finance',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2023-10-01T10:00:00Z'),
      },
      {
        firstName: 'Ivy',
        lastName: 'Green',
        email: 'ivy.green@example.com',
        birthDate: new Date('1990-01-01'),
        phoneNumber: '9900112233',
        jobTitle: 'Content Writer',
        department: 'Marketing',
        employmentType: 'Full-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2023-11-01T10:00:00Z'),
      },
      {
        firstName: 'Jack',
        lastName: 'Black',
        email: 'jack.black@example.com',
        birthDate: new Date('1985-05-15'),
        phoneNumber: '8800223344',
        jobTitle: 'SEO Specialist',
        department: 'Marketing',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2023-12-01T10:00:00Z'),
      },
      {
        firstName: 'Karen',
        lastName: 'White',
        email: 'karen.white@example.com',
        birthDate: new Date('1992-07-20'),
        phoneNumber: '7700334455',
        jobTitle: 'Graphic Designer',
        department: 'Design',
        employmentType: 'Part-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2024-01-01T10:00:00Z'),
      },
      {
        firstName: 'Leo',
        lastName: 'Brown',
        email: 'leo.brown@example.com',
        birthDate: new Date('1988-03-14'),
        phoneNumber: '6600445566',
        jobTitle: 'Network Engineer',
        department: 'IT',
        employmentType: 'Full-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2024-02-01T10:00:00Z'),
      },
      {
        firstName: 'Mia',
        lastName: 'Davis',
        email: 'mia.davis@example.com',
        birthDate: new Date('1995-11-30'),
        phoneNumber: '5500556677',
        jobTitle: 'Social Media Manager',
        department: 'Marketing',
        employmentType: 'Contract',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2024-03-01T10:00:00Z'),
      },
      {
        firstName: 'Noah',
        lastName: 'Wilson',
        email: 'noah.wilson@example.com',
        birthDate: new Date('1991-04-22'),
        phoneNumber: '4400667788',
        jobTitle: 'Business Analyst',
        department: 'Business',
        employmentType: 'Full-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2024-04-01T10:00:00Z'),
      },
      {
        firstName: 'Olivia',
        lastName: 'Thomas',
        email: 'olivia.thomas@example.com',
        birthDate: new Date('1987-09-10'),
        phoneNumber: '3300778899',
        jobTitle: 'HR Specialist',
        department: 'Human Resources',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2024-05-01T10:00:00Z'),
      },
      {
        firstName: 'Paul',
        lastName: 'White',
        email: 'paul.white@example.com',
        birthDate: new Date('1993-12-05'),
        phoneNumber: '2200889900',
        jobTitle: 'Account Manager',
        department: 'Sales',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2024-06-01T10:00:00Z'),
      },
      {
        firstName: 'Quinn',
        lastName: 'Harris',
        email: 'quinn.harris@example.com',
        birthDate: new Date('1989-06-18'),
        phoneNumber: '1100990011',
        jobTitle: 'Customer Success Manager',
        department: 'Support',
        employmentType: 'Part-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2024-07-01T10:00:00Z'),
      },
      {
        firstName: 'Rachel',
        lastName: 'Martin',
        email: 'rachel.martin@example.com',
        birthDate: new Date('1994-02-25'),
        phoneNumber: '0011223344',
        jobTitle: 'Financial Advisor',
        department: 'Finance',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2024-08-01T10:00:00Z'),
      },
      {
        firstName: 'Sam',
        lastName: 'Green',
        email: 'sam.green@example.com',
        birthDate: new Date('1990-01-01'),
        phoneNumber: '1122334455',
        jobTitle: 'Legal Advisor',
        department: 'Legal',
        employmentType: 'Full-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2024-09-01T10:00:00Z'),
      },
      {
        firstName: 'Tina',
        lastName: 'Black',
        email: 'tina.black@example.com',
        birthDate: new Date('1985-05-15'),
        phoneNumber: '2233445566',
        jobTitle: 'PR Specialist',
        department: 'Public Relations',
        employmentType: 'Full-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2024-10-01T10:00:00Z'),
      },
      {
        firstName: 'Uma',
        lastName: 'White',
        email: 'uma.white@example.com',
        birthDate: new Date('1992-07-20'),
        phoneNumber: '3344556677',
        jobTitle: 'Event Coordinator',
        department: 'Events',
        employmentType: 'Part-time',
        workLocation: 'Office',
        password: 'password123',
        createdAt: new Date('2024-11-01T10:00:00Z'),
      },
      {
        firstName: 'Victor',
        lastName: 'Brown',
        email: 'victor.brown@example.com',
        birthDate: new Date('1988-03-14'),
        phoneNumber: '4455667788',
        jobTitle: 'IT Support',
        department: 'IT',
        employmentType: 'Full-time',
        workLocation: 'Remote',
        password: 'password123',
        createdAt: new Date('2024-12-01T10:00:00Z'),
      },
    ],
  });

  const users = await prisma.user.findMany();

  await prisma.post.createMany({
    data: [
      {
        title: 'Welcome to the Team!',
        content: 'We are excited to welcome our new team members to the company. Let\'s achieve great things together!',
        authorId: users[0].id,
        createdAt: new Date('2023-01-01T10:00:00Z'),
      },
      {
        title: 'Quarterly Performance Review',
        content: 'Our quarterly performance review is coming up. Please ensure all your reports are up to date.',
        authorId: users[0].id,
        createdAt: new Date('2023-02-01T10:00:00Z'),
      },
      {
        title: 'Product Launch Announcement',
        content: 'We are thrilled to announce the launch of our new product. Join us for the launch event next week.',
        authorId: users[1].id,
        createdAt: new Date('2023-03-01T10:00:00Z'),
      },
      {
        title: 'Team Building Activities',
        content: 'Join us for a series of team-building activities this Friday. Let\'s strengthen our team spirit!',
        authorId: users[1].id,
        createdAt: new Date('2023-04-01T10:00:00Z'),
      },
      {
        title: 'Health and Wellness Program',
        content: 'We are launching a new health and wellness program for all employees. Stay tuned for more details.',
        authorId: users[2].id,
        createdAt: new Date('2023-05-01T10:00:00Z'),
      },
      {
        title: 'Employee of the Month',
        content: 'Congratulations to our Employee of the Month! Your hard work and dedication are truly appreciated.',
        authorId: users[2].id,
        createdAt: new Date('2023-06-01T10:00:00Z'),
      },
      {
        title: 'Office Renovation Update',
        content: 'Our office renovation is progressing well. We appreciate your patience during this time.',
        authorId: users[3].id,
        createdAt: new Date('2023-07-01T10:00:00Z'),
      },
      {
        title: 'New Company Policies',
        content: 'Please review the updated company policies on our intranet. Your compliance is important.',
        authorId: users[3].id,
        createdAt: new Date('2023-08-01T10:00:00Z'),
      },
      {
        title: 'Annual Company Picnic',
        content: 'Join us for our annual company picnic next month. It\'s a great opportunity to relax and have fun!',
        authorId: users[4].id,
        createdAt: new Date('2023-09-01T10:00:00Z'),
      },
      {
        title: 'Training and Development',
        content: 'We are offering new training and development programs. Sign up to enhance your skills.',
        authorId: users[4].id,
        createdAt: new Date('2023-10-01T10:00:00Z'),
      },
      {
        title: 'Customer Feedback',
        content: 'We value customer feedback. Please review the latest feedback and work on the action items.',
        authorId: users[5].id,
        createdAt: new Date('2023-11-01T10:00:00Z'),
      },
      {
        title: 'Sustainability Initiatives',
        content: 'Our company is committed to sustainability. Learn more about our new initiatives and how you can contribute.',
        authorId: users[5].id,
        createdAt: new Date('2023-12-01T10:00:00Z'),
      },
      {
        title: 'Holiday Schedule',
        content: 'Please review the holiday schedule for the upcoming year. Plan your vacations accordingly.',
        authorId: users[6].id,
        createdAt: new Date('2024-01-01T10:00:00Z'),
      },
      {
        title: 'Diversity and Inclusion',
        content: 'We are committed to diversity and inclusion. Join us for a workshop on creating an inclusive workplace.',
        authorId: users[6].id,
        createdAt: new Date('2024-02-01T10:00:00Z'),
      },
      {
        title: 'IT System Maintenance',
        content: 'Our IT systems will undergo maintenance this weekend. Please save your work and log off before leaving.',
        authorId: users[7].id,
        createdAt: new Date('2024-03-01T10:00:00Z'),
      },
      {
        title: 'Charity Fundraiser',
        content: 'Join us for a charity fundraiser event. Let\'s give back to the community and make a difference.',
        authorId: users[7].id,
        createdAt: new Date('2024-04-01T10:00:00Z'),
      },
      {
        title: 'Project Milestone Achieved',
        content: 'Congratulations to the team for achieving a major project milestone. Keep up the great work!',
        authorId: users[8].id,
        createdAt: new Date('2024-05-01T10:00:00Z'),
      },
      {
        title: 'New Office Locations',
        content: 'We are expanding! Check out our new office locations and the opportunities they bring.',
        authorId: users[8].id,
        createdAt: new Date('2024-06-01T10:00:00Z'),
      },
      {
        title: 'Employee Benefits Update',
        content: 'We have updated our employee benefits package. Please review the changes and reach out with any questions.',
        authorId: users[9].id,
        createdAt: new Date('2024-07-01T10:00:00Z'),
      },
      {
        title: 'Company Town Hall Meeting',
        content: 'Join us for the company town hall meeting next week. We will discuss our goals and plans for the future.',
        authorId: users[9].id,
        createdAt: new Date('2024-08-01T10:00:00Z'),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });