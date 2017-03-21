const settings = {
    table: {
        pagination: {
            page: 1,
            options: [
                {
                    value: 25,
                    selected: false
                },
                {
                    value: 50,
                    selected: true
                },
                {
                    value: 100,
                    selected: false
                },
                {
                    value: 250,
                    selected: false
                }
            ]
        },
        columns: {
            isID: [
                "ID-nr",
                "Vader",
                "Moeder"
            ],
            show: [
                "ID-nr",
                "Voornaam",
                "Achternaam",
                "Geslacht",
                "Vader",
                "Moeder",
                "Beroep",
                "Geboorte datum",
                "Geboorte plaats",
                "Overlijden datum",
                "Overlijden plaats",
                "Burgerlijke staat"
            ]
        },
        filters: {}
    },
    message: {
        closeButton: false,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "200",
        hideDuration: "1000",
        timeOut: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    }
};

export default settings;
