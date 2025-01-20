import React from "react";

const AdministratorDashboard = React.lazy(() => import('../pages/dashboard'));
const School = React.lazy(() => import('../pages/master/school'));
const Year = React.lazy(() => import('../pages/master/year'));
const Semester = React.lazy(() => import('../pages/master/semester'));
const Holiday = React.lazy(() => import('../pages/master/holiday'));
const Work = React.lazy(() => import('../pages/master/work'));
const AdministratorTeacher = React.lazy(() => import('../pages/teacher'));
const TeacherView = React.lazy(() => import('../pages/teacher/view'));
const AdministratorUser = React.lazy(() => import('../pages/user'));
const AdministratorPresence = React.lazy(() => import('../pages/presence'));
const PresenceDetail = React.lazy(() => import('../pages/presence/Detail'));
const Recapitulation = React.lazy(() => import('../pages/recapitulation'));

const HeadDashboard = React.lazy(() => import('../pages/dashboard'));
const TeacherDashboard = React.lazy(() => import('../pages/dashboard'));

const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error504 = React.lazy(() => import('../pages/error/Error504'));
const Scan = React.lazy(() => import('../pages/scan'));

const administratorRoute = [
    {path: '/', name: 'Dashboard', component: <AdministratorDashboard/>},
    {path: '/administrator', name: 'Dashboard', element: <AdministratorDashboard />},
    {path: '/master/data-sekolah', name: 'Dashboard', element: <School />},
    {path: '/master/data-tapel', name: 'Data Tahun Pelajaran', element: <Year />},
    {path: '/master/data-semester', name: 'Data Semester', element: <Semester />},
    {path: '/master/data-hari-libur', name: 'Data Hari Libur', element: <Holiday />},
    {path: '/master/data-jam-kerja', name: 'Data Jam Kerja', element: <Work />},
    {path: '/data-guru', name: 'Data Guru/Karyawan', element: <AdministratorTeacher />},
    {path: '/data-guru/:id/detail', name: 'Data Guru/Karyawan', element: <TeacherView />},
    {path: '/absensi/kelola', name: 'Data Absensi', element: <AdministratorPresence />},
    {path: '/absensi/kelola/:month/:year', name: 'Data Absensi', element: <PresenceDetail />},
    {path: '/absensi/rekapitulasi', name: 'Data Rekapitulasi', element: <Recapitulation />},
    {path: '/pengguna', name: 'Data Pengguna', element: <AdministratorUser />},
]

const headRoute = [
    {path: '/kepala-madrasah', name: 'Dashboard', element: <HeadDashboard />},
]

const teacherRoute = [
    {path: '/guru', name: 'Dashboard', element: <TeacherDashboard />},
]

export const protectedRoutes = [
    ...administratorRoute,
    ...headRoute,
    ...teacherRoute,
]
export const publicRoutes = [
    {path: '/auth/masuk', name: 'Masuk', element: <Login />},
    {path: '/auth/keluar', name: 'Keluar', element: <Logout/>},
    {path: '/scan/absensi', name: 'Presensi', element: <Scan/>},
    {path: '/error404', name: 'Error404', element: <Error404/>},
    {path: '/error504', name: 'Error504', element: <Error504/>},
    {path: '*', name: 'Error404', element: <Error404/>},
]