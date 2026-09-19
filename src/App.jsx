import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { StudentAttendance } from './pages/StudentAttendance';
import { StudentChat } from './pages/StudentChat';
import { StudentTests } from './pages/StudentTests';
import { AIChatbot } from './pages/AIChatbot';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { TeacherClasses } from './pages/TeacherClasses';
import { TeacherTests } from './pages/TeacherTests';
import { TestWindow } from './pages/TestWindow';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/chat" element={<StudentChat />} />
        <Route path="/student/tests" element={<StudentTests />} />
        <Route path="/student/ai-tutor" element={<AIChatbot />} />
        
        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/tests" element={<TeacherTests />} />

        {/* Test Window */}
        <Route path="/test/:id" element={<TestWindow />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
