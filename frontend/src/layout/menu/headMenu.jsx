const headMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/",
    },
    {
        icon: "user-fill",
        text: "Data Guru",
        link: "/kepala/data-guru",
    },
    {
        icon: "file",
        text: "Ajuan",
        active: false,
        subMenu: [
            {
                text: "Ajuan Ijin",
                link: "/kepala/ajuan/ijin",
            },
            {
                text: "Ajuan Tanda Tangan",
                link: "/kepala/ajuan/ttd",
            },
        ],
    },
    {
        icon: "calendar",
        text: "Absensi",
        active: false,
        subMenu: [
            {
                text: "Kelola Absensi",
                link: "/kepala/absensi/kelola",
            },
            {
                text: "Rekapitulasi",
                link: "/kepala/absensi/rekapitulasi",
            },
        ],
    },
    {
        icon: "check",
        text: "Tanda Tangan",
        link: "/kepala/tanda-tangan",
    },
    {
        icon: "setting-alt",
        text: "Pengaturan",
        link: "/kepala/pengaturan",
    },
];
export default headMenu;
