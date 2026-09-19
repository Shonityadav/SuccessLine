export const mockUsers = {
  teachers: [
    { 
      id: 't1', 
      name: 'Mr. Sharma', 
      subject: 'Mathematics', 
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&q=80',
      cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 't2', 
      name: 'Mrs. Gupta', 
      subject: 'Physics',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      cover: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80'
    }
  ],
  students: [
    { 
      id: 's1', 
      name: 'Rahul Kumar', 
      grade: '10th', 
      attendance: '92%',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80'
    },
    { 
      id: 's2', 
      name: 'Priya Singh', 
      grade: '10th', 
      attendance: '88%',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    { 
      id: 's3', 
      name: 'Amit Patel', 
      grade: '12th', 
      attendance: '95%',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    { 
      id: 's4', 
      name: 'Neha Verma', 
      grade: '12th', 
      attendance: '85%',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
    }
  ]
};

export const mockClasses = [
  { 
    id: 'c1', 
    name: '10th Standard Mathematics', 
    teacherId: 't1', 
    students: ['s1', 's2'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'c2', 
    name: '12th Standard Physics', 
    teacherId: 't2', 
    students: ['s3', 's4'],
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80'
  }
];

export const mockTests = [
  {
    id: 'test1',
    title: 'Algebra Mid-Term',
    classId: 'c1',
    status: 'active',
    durationMinutes: 45,
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    questions: [
      { id: 'q1', text: 'Solve for x: 2x + 5 = 15', type: 'mcq', options: ['5', '10', '2.5', '15'], answer: '5' },
      { id: 'q2', text: 'What is the quadratic formula?', type: 'text' }
    ]
  },
  {
    id: 'test2',
    title: 'Kinematics Quiz',
    classId: 'c2',
    status: 'upcoming',
    durationMinutes: 30,
    cover: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?auto=format&fit=crop&w=600&q=80',
    questions: [
      { id: 'q3', text: 'A car accelerates at 2m/s². If it starts from rest, what is its velocity after 5 seconds?', type: 'mcq', options: ['10 m/s', '5 m/s', '20 m/s', '2 m/s'], answer: '10 m/s' }
    ]
  }
];

export const mockNotifications = [
  { id: 'n1', title: 'Extra Class Scheduled', text: 'Maths extra class on Saturday at 10 AM.', date: 'Today, 08:30 AM', targetRole: 'student', type: 'info' },
  { id: 'n2', title: 'Assignment Due', text: 'Please submit physics assignments by Friday.', date: 'Yesterday, 02:15 PM', targetRole: 'student', type: 'warning' },
  { id: 'n3', title: 'Staff Meeting', text: 'Monthly staff meeting at 4 PM in Hall A.', date: 'Yesterday, 09:00 AM', targetRole: 'teacher', type: 'info' },
  { id: 'n4', title: 'New Test Available', text: 'Algebra Mid-Term is now active.', date: 'Today, 10:00 AM', targetRole: 'student', type: 'success' }
];
