const teacherMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/",
    },
    {
        icon: "user-fill",
        text: "Data Guru",
        link: "/guru/ubah",
    },
    {
        icon: "calendar",
        text: "Absensi",
        active: false,
        subMenu: [
            {
                text: "Scan",
                link: "/scan/absensi",
            },
            {
                text: "Perijinan",
                link: "/guru/absensi/perijinan",
            },
            {
                text: "Rekapitulasi",
                link: "/guru/absensi/rekapitulasi",
            },
        ],
    },
    {
        icon: "setting-alt",
        text: "Pengaturan",
        link: "/guru/pengaturan-pengguna",
    },
];
export default teacherMenu;
