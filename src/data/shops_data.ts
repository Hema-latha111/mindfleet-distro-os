import type { Shop } from '../store/types';

export const SHOPS_LIST: Shop[] = [
    {
        "id": "shop_1",
        "name": "A M Store",
        "owner_name": "Annaa",
        "phone": "9940430512",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.112057763055972,
            "lng": 80.20365365172968,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Annaa",
        "address": "#13/A, Nehru Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.112057763055972,
        "lng": 80.20365365172968,
        "assignedStaffId": "s1",
        "balance": 3373
    },
    {
        "id": "shop_2",
        "name": "A R Traders",
        "owner_name": "Babu",
        "phone": "8825408224",
        "area": "Chennai",
        "zone": "Zone A",
        "geo": {
            "lat": 13.101196482348573,
            "lng": 80.21020588702298,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Babu",
        "address": "Venkatraman Salai Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.101196482348573,
        "lng": 80.21020588702298,
        "assignedStaffId": "s2",
        "balance": 2182
    },
    {
        "id": "shop_3",
        "name": "A S S Store",
        "owner_name": "Sundar",
        "phone": "9003017232",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.124707639838372,
            "lng": 80.20592516284513,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Sundar",
        "address": "22th street GKM Colony Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.124707639838372,
        "lng": 80.20592516284513,
        "assignedStaffId": "s3",
        "balance": 1957
    },
    {
        "id": "shop_4",
        "name": "A S Store",
        "owner_name": "Meena",
        "phone": "9677199256",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.119756946954245,
            "lng": 80.20612180188164,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Meena",
        "address": "Kamarajar Salai Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.119756946954245,
        "lng": 80.20612180188164,
        "assignedStaffId": "s4",
        "balance": 3996
    },
    {
        "id": "shop_5",
        "name": "Aadhith Sam Store",
        "owner_name": "Sam Richard",
        "phone": "9884759636",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.104002056569247,
            "lng": 80.20160145147226,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Sam Richard",
        "address": "#4/S, 11/1, Chennai Battai Road, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.104002056569247,
        "lng": 80.20160145147226,
        "assignedStaffId": "s5",
        "balance": 2602
    },
    {
        "id": "shop_6",
        "name": "Adhik Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#1/1, Thanthoniamman 1st Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s6",
        "balance": 1091
    },
    {
        "id": "shop_7",
        "name": "Affa Foods",
        "owner_name": "Rehamathualla",
        "phone": "9123521540",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.105724944904713,
            "lng": 80.19881106720273,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Rehamathualla",
        "address": "#9/264, B Type, 2nd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.105724944904713,
        "lng": 80.19881106720273,
        "assignedStaffId": "s7",
        "balance": 2133
    },
    {
        "id": "shop_8",
        "name": "Alankar Cool Bar",
        "owner_name": "Billal",
        "phone": "9043516182",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.109868544318187,
            "lng": 80.20488427946187,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Billal",
        "address": "#10/148, B Type, 2nd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.109868544318187,
        "lng": 80.20488427946187,
        "assignedStaffId": "s8",
        "balance": 1292
    },
    {
        "id": "shop_9",
        "name": "Amire store",
        "owner_name": "Moudian",
        "phone": "9940371450",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108393488874423,
            "lng": 80.20079372595322,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Moudian",
        "address": "Sidco 2th Main road Villivakkam Chennai 42",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108393488874423,
        "lng": 80.20079372595322,
        "assignedStaffId": "s9",
        "balance": 721
    },
    {
        "id": "shop_10",
        "name": "Amman Store",
        "owner_name": "Unknown",
        "phone": "8610325638",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.102725176047665,
            "lng": 80.20998446777686,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#236C, Moppiliamman Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.102725176047665,
        "lng": 80.20998446777686,
        "assignedStaffId": "s10",
        "balance": 262
    },
    {
        "id": "shop_11",
        "name": "Anand Store",
        "owner_name": "Anand",
        "phone": "000000",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.125195763049105,
            "lng": 80.21404177200569,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Anand",
        "address": "#1, Srinivasa Nagar 3rd Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.125195763049105,
        "lng": 80.21404177200569,
        "assignedStaffId": "s11",
        "balance": 1815
    },
    {
        "id": "shop_12",
        "name": "Anand Store",
        "owner_name": "Anand",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.122601042492994,
            "lng": 80.2144045481592,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Anand",
        "address": "#63, SRB Nagar, 5th Street, Kolathur, Chennai 99",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.122601042492994,
        "lng": 80.2144045481592,
        "assignedStaffId": "s12",
        "balance": 716
    },
    {
        "id": "shop_13",
        "name": "Angalamman Store",
        "owner_name": "Kumar",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.11444917958871,
            "lng": 80.20189901143875,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Kumar",
        "address": "#61, North Redhills Road, Villivakkam, Chennai 49",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.11444917958871,
        "lng": 80.20189901143875,
        "assignedStaffId": "s13",
        "balance": 4167
    },
    {
        "id": "shop_14",
        "name": "Annai Store",
        "owner_name": "Michel Raj",
        "phone": "7092609531",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.118846313154668,
            "lng": 80.2110353000501,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Michel Raj",
        "address": "143, Redhills Road, Makkaram Thottam, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.118846313154668,
        "lng": 80.2110353000501,
        "assignedStaffId": "s14",
        "balance": 4436
    },
    {
        "id": "shop_15",
        "name": "Annai Veg Market",
        "owner_name": "Mathan",
        "phone": "7200933163",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.119530275509371,
            "lng": 80.20899764129706,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Mathan",
        "address": "Jambulingam main road Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.119530275509371,
        "lng": 80.20899764129706,
        "assignedStaffId": "s15",
        "balance": 3460
    },
    {
        "id": "shop_16",
        "name": "Annamalai Store",
        "owner_name": "Narayanan",
        "phone": "9952345486",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.11281021478974,
            "lng": 80.20697183756498,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Narayanan",
        "address": "#91, 3rd Mainroad, Redhills Road, Villivakkam, Chennai 46, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.11281021478974,
        "lng": 80.20697183756498,
        "assignedStaffId": "s1",
        "balance": 4815
    },
    {
        "id": "shop_17",
        "name": "Arumugam store",
        "owner_name": "Arumugam",
        "phone": "9342470710",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.125702931375608,
            "lng": 80.20899985696553,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Arumugam",
        "address": "Jambulingam Kolathur Chennai 98",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.125702931375608,
        "lng": 80.20899985696553,
        "assignedStaffId": "s2",
        "balance": 2742
    },
    {
        "id": "shop_18",
        "name": "Ayyanar Store",
        "owner_name": "Kani",
        "phone": "9884568047",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.12446196505323,
            "lng": 80.2134320422433,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Kani",
        "address": "#202, Mahatma Gandhi Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.12446196505323,
        "lng": 80.2134320422433,
        "assignedStaffId": "s3",
        "balance": 4568
    },
    {
        "id": "shop_19",
        "name": "Ayyanar Store",
        "owner_name": "Raja",
        "phone": "9841464408",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.119829237227112,
            "lng": 80.21799084957789,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Raja",
        "address": "#16, Anusuya Nagar 2nd Street, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.119829237227112,
        "lng": 80.21799084957789,
        "assignedStaffId": "s4",
        "balance": 2091
    },
    {
        "id": "shop_20",
        "name": "Ayyanar Store",
        "owner_name": "Moorthi",
        "phone": "9094280873",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.103841284735369,
            "lng": 80.205227277567,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Moorthi",
        "address": "#5A, Mettu Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.103841284735369,
        "lng": 80.205227277567,
        "assignedStaffId": "s5",
        "balance": 3212
    },
    {
        "id": "shop_21",
        "name": "Ayyanar Store",
        "owner_name": "Rajakani",
        "phone": "9094825757",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.110977757275894,
            "lng": 80.20108211188409,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Rajakani",
        "address": "#264/19, Agadhishwarar Koil Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.110977757275894,
        "lng": 80.20108211188409,
        "assignedStaffId": "s6",
        "balance": 4040
    },
    {
        "id": "shop_22",
        "name": "Ayyanar Store",
        "owner_name": "Unknown",
        "phone": "9841464408",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#16, Anusuya Nagar, 2nd Street, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s7",
        "balance": 4114
    },
    {
        "id": "shop_23",
        "name": "Ayyanar Store",
        "owner_name": "Unknown",
        "phone": "9884568047",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#202, Mahatma Gandhi Nagar Mainroad, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s8",
        "balance": 4204
    },
    {
        "id": "shop_24",
        "name": "Ayyanar Store",
        "owner_name": "Jayakumar",
        "phone": "9444190188",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.129929994706712,
            "lng": 80.21946038722734,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Jayakumar",
        "address": "#1, Kolathur Mainroad, Silandhi Kuttai, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.129929994706712,
        "lng": 80.21946038722734,
        "assignedStaffId": "s9",
        "balance": 3271
    },
    {
        "id": "shop_25",
        "name": "Ayyanar store",
        "owner_name": "Murthi",
        "phone": "9094280873",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10869580195322,
            "lng": 80.20225361003939,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Murthi",
        "address": "Mettu street Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10869580195322,
        "lng": 80.20225361003939,
        "assignedStaffId": "s10",
        "balance": 2688
    },
    {
        "id": "shop_26",
        "name": "Azmat store",
        "owner_name": "Nasar",
        "phone": "8056309194",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.110126656352293,
            "lng": 80.20256034590415,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Nasar",
        "address": "Ponnanakehari street Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.110126656352293,
        "lng": 80.20256034590415,
        "assignedStaffId": "s11",
        "balance": 3800
    },
    {
        "id": "shop_27",
        "name": "Balaji Provision Stotre",
        "owner_name": "Sitaram",
        "phone": "9710694664",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108528996769408,
            "lng": 80.19965342597652,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Sitaram",
        "address": "#31/55, 1st Mainroad, Nehru Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108528996769408,
        "lng": 80.19965342597652,
        "assignedStaffId": "s12",
        "balance": 843
    },
    {
        "id": "shop_28",
        "name": "Balaji Store",
        "owner_name": "Balaji",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.109677911104995,
            "lng": 80.19921894082347,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Balaji",
        "address": "#15, Chettithoppu Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.109677911104995,
        "lng": 80.19921894082347,
        "assignedStaffId": "s13",
        "balance": 4217
    },
    {
        "id": "shop_29",
        "name": "Balaji Store",
        "owner_name": "Venkatesh",
        "phone": "9003051233",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Venkatesh",
        "address": "#31, Ponnan Kinaru Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s14",
        "balance": 2438
    },
    {
        "id": "shop_30",
        "name": "Balaji Store",
        "owner_name": "Balaji",
        "phone": "7871857775",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.11423909933964,
            "lng": 80.21055756374616,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Balaji",
        "address": "#18, Barathi Nagar, Kolathur Mainroad, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.11423909933964,
        "lng": 80.21055756374616,
        "assignedStaffId": "s15",
        "balance": 220
    },
    {
        "id": "shop_31",
        "name": "Balamurugan Store",
        "owner_name": "Damodaran",
        "phone": "9551669282",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107950677559804,
            "lng": 80.19888582738167,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Damodaran",
        "address": "#108/1, North Redhills Road, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.107950677559804,
        "lng": 80.19888582738167,
        "assignedStaffId": "s1",
        "balance": 4023
    },
    {
        "id": "shop_32",
        "name": "Balamurugan Store",
        "owner_name": "Damodharan",
        "phone": "9600359377",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Damodharan",
        "address": "#16, 3rd Street, Redhills Road, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s2",
        "balance": 636
    },
    {
        "id": "shop_33",
        "name": "Balan Store",
        "owner_name": "Balan",
        "phone": "9952951513",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.11173401647895,
            "lng": 80.20438302201799,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Balan",
        "address": "#172, 38th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.11173401647895,
        "lng": 80.20438302201799,
        "assignedStaffId": "s3",
        "balance": 673
    },
    {
        "id": "shop_34",
        "name": "Bharath Store",
        "owner_name": "Unknown",
        "phone": "9941215710",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.114606487564185,
            "lng": 80.20315422208483,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#35/10, East Mada Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.114606487564185,
        "lng": 80.20315422208483,
        "assignedStaffId": "s4",
        "balance": 3921
    },
    {
        "id": "shop_35",
        "name": "Bharath store",
        "owner_name": "Thangam",
        "phone": "9941215710",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.104992346191683,
            "lng": 80.20593362578869,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Thangam",
        "address": "East made street Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.104992346191683,
        "lng": 80.20593362578869,
        "assignedStaffId": "s5",
        "balance": 3439
    },
    {
        "id": "shop_36",
        "name": "Bhattai Store",
        "owner_name": "Unknown",
        "phone": "9444670296",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#11D/1, Chennai Battai Road, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s6",
        "balance": 2923
    },
    {
        "id": "shop_37",
        "name": "Bismi Store",
        "owner_name": "Sheik Ahmed",
        "phone": "9600008549",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.119639718290996,
            "lng": 80.21332235775276,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Sheik Ahmed",
        "address": "#15/2, SRB Nagar, 11th Street, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.119639718290996,
        "lng": 80.21332235775276,
        "assignedStaffId": "s7",
        "balance": 1851
    },
    {
        "id": "shop_38",
        "name": "Bommu Store",
        "owner_name": "Unknown",
        "phone": "8489061237",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.103668942560684,
            "lng": 80.19715412734688,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#44/32, North Mada Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.103668942560684,
        "lng": 80.19715412734688,
        "assignedStaffId": "s8",
        "balance": 1932
    },
    {
        "id": "shop_39",
        "name": "C K Store",
        "owner_name": "Unknown Owner",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.118286377127365,
            "lng": 80.20839895862174,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown Owner",
        "address": "#17, Dhayalu Nagar, 1st Mainroad, Kolathur, Chennai 99",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.118286377127365,
        "lng": 80.20839895862174,
        "assignedStaffId": "s9",
        "balance": 3375
    },
    {
        "id": "shop_40",
        "name": "Chairman Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.1123701953374,
            "lng": 80.20517374437217,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#48, 2nd Street, Bharathi Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.1123701953374,
        "lng": 80.20517374437217,
        "assignedStaffId": "s10",
        "balance": 2861
    },
    {
        "id": "shop_41",
        "name": "Chandran Store",
        "owner_name": "Unknown",
        "phone": "9884169210",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#11/23, Ponnan Kinaru Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s11",
        "balance": 4755
    },
    {
        "id": "shop_42",
        "name": "Daksha Store",
        "owner_name": "Unknown Owner",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.118609507807182,
            "lng": 80.20586230423032,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown Owner",
        "address": "#3, C20, Neelakandan Street, Annai Satya Nagar, Kolathur, Chennai 99",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.118609507807182,
        "lng": 80.20586230423032,
        "assignedStaffId": "s12",
        "balance": 912
    },
    {
        "id": "shop_43",
        "name": "DD Kai Kani Mandi",
        "owner_name": "Unknown",
        "phone": "9841128801",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#36/108, Makkaram Thottam, North Redhills Road, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s13",
        "balance": 482
    },
    {
        "id": "shop_44",
        "name": "DD Kaigari Mandi",
        "owner_name": "Arul",
        "phone": "9841128801",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.13074927055783,
            "lng": 80.21708525221172,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Arul",
        "address": "#36/108, Makkaram Thottam, North Redhills Road, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.13074927055783,
        "lng": 80.21708525221172,
        "assignedStaffId": "s14",
        "balance": 610
    },
    {
        "id": "shop_45",
        "name": "Deelip store",
        "owner_name": "Giribabu",
        "phone": "9710283587",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.11145984455902,
            "lng": 80.20884610829683,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Giribabu",
        "address": "Sidco 2th Main road Villivakkam Chennai 42",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.11145984455902,
        "lng": 80.20884610829683,
        "assignedStaffId": "s15",
        "balance": 3359
    },
    {
        "id": "shop_46",
        "name": "Deepa Store",
        "owner_name": "Unknown Owner",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.124037771736125,
            "lng": 80.20628654350269,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown Owner",
        "address": "#30, Dhayalu Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.124037771736125,
        "lng": 80.20628654350269,
        "assignedStaffId": "s1",
        "balance": 4888
    },
    {
        "id": "shop_47",
        "name": "Devi Store",
        "owner_name": "Madasamy",
        "phone": "9841774661",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.106173050631652,
            "lng": 80.20774691618344,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Madasamy",
        "address": "#66, Thanthoniamman 1st Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106173050631652,
        "lng": 80.20774691618344,
        "assignedStaffId": "s2",
        "balance": 1115
    },
    {
        "id": "shop_48",
        "name": "Dhanalakshmi Store",
        "owner_name": "Balan",
        "phone": "9003267292",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.111175209271906,
            "lng": 80.2104694328665,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Balan",
        "address": "#5/188, 63rd Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.111175209271906,
        "lng": 80.2104694328665,
        "assignedStaffId": "s3",
        "balance": 4283
    },
    {
        "id": "shop_49",
        "name": "Esakkiammal Store",
        "owner_name": "Chandra Shekaran",
        "phone": "7010505910",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.120652805730762,
            "lng": 80.21020343003296,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Chandra Shekaran",
        "address": "#3, V V Nagar Extension, Kolathur Mainroad,, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.120652805730762,
        "lng": 80.21020343003296,
        "assignedStaffId": "s4",
        "balance": 4669
    },
    {
        "id": "shop_50",
        "name": "Eswaran store",
        "owner_name": "Renuka devi",
        "phone": "9500130389",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.103046691866599,
            "lng": 80.19650138304681,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Renuka devi",
        "address": "Palayanamman street Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.103046691866599,
        "lng": 80.19650138304681,
        "assignedStaffId": "s5",
        "balance": 1385
    },
    {
        "id": "shop_51",
        "name": "G Kamsa Coo Bar",
        "owner_name": "Moorthi",
        "phone": "9789816140",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Moorthi",
        "address": "#3, Devar Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s6",
        "balance": 4174
    },
    {
        "id": "shop_52",
        "name": "Ganapati store",
        "owner_name": "Arun Selvan",
        "phone": "8939530899",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.128709192153641,
            "lng": 80.20877083801105,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Arun Selvan",
        "address": "11th cross street poompuhar nagar Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.128709192153641,
        "lng": 80.20877083801105,
        "assignedStaffId": "s7",
        "balance": 4961
    },
    {
        "id": "shop_53",
        "name": "Ganesh Store",
        "owner_name": "Ganesh",
        "phone": "7397423774",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108108511296091,
            "lng": 80.1977797914138,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Ganesh",
        "address": "#9/363, B Type, 2nd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108108511296091,
        "lng": 80.1977797914138,
        "assignedStaffId": "s8",
        "balance": 983
    },
    {
        "id": "shop_54",
        "name": "Ganesh store",
        "owner_name": "Ganesh",
        "phone": "9344330865",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.113750657449126,
            "lng": 80.20658421488626,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Ganesh",
        "address": "Thiruveethi Amman Koil St, Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.113750657449126,
        "lng": 80.20658421488626,
        "assignedStaffId": "s9",
        "balance": 78
    },
    {
        "id": "shop_55",
        "name": "Goweri store",
        "owner_name": "Gowri",
        "phone": "9962507005",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108461830571411,
            "lng": 80.19656863124132,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Gowri",
        "address": "East made street Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108461830571411,
        "lng": 80.19656863124132,
        "assignedStaffId": "s10",
        "balance": 4218
    },
    {
        "id": "shop_56",
        "name": "Gowri Tailoring",
        "owner_name": "Gowri",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Gowri",
        "address": "#1, East Mada Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s11",
        "balance": 2842
    },
    {
        "id": "shop_57",
        "name": "Gurusamy Store",
        "owner_name": "Loganathan",
        "phone": "9994832007",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107304783824906,
            "lng": 80.19910868638367,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Loganathan",
        "address": "#63, Nehru Nagar Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.107304783824906,
        "lng": 80.19910868638367,
        "assignedStaffId": "s12",
        "balance": 1263
    },
    {
        "id": "shop_58",
        "name": "Isakkiamman Store",
        "owner_name": "Vasu",
        "phone": "6380621321",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.117360571086532,
            "lng": 80.20801376268705,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Vasu",
        "address": "#13/B, Rajan Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.117360571086532,
        "lng": 80.20801376268705,
        "assignedStaffId": "s13",
        "balance": 3928
    },
    {
        "id": "shop_59",
        "name": "Janakiraman Store",
        "owner_name": "Samynathan",
        "phone": "6383044369",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.130522000722905,
            "lng": 80.21463138511412,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Samynathan",
        "address": "#64, Makkaram Thottam, North Redhills Road, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.130522000722905,
        "lng": 80.21463138511412,
        "assignedStaffId": "s14",
        "balance": 548
    },
    {
        "id": "shop_60",
        "name": "Jaya Store",
        "owner_name": "Unknown",
        "phone": "9445424578",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#1, Muthumariamman Koil Street, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s15",
        "balance": 3744
    },
    {
        "id": "shop_61",
        "name": "Jaya Store",
        "owner_name": "Lakshmanan",
        "phone": "9445424578",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.129811105243565,
            "lng": 80.22023138836306,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Lakshmanan",
        "address": "#1, Muthumariamman Koil Street, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.129811105243565,
        "lng": 80.22023138836306,
        "assignedStaffId": "s1",
        "balance": 4042
    },
    {
        "id": "shop_62",
        "name": "Jayavani Store",
        "owner_name": "Unknown",
        "phone": "9884655197",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#129, MTH Road, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s2",
        "balance": 1005
    },
    {
        "id": "shop_63",
        "name": "Jebaraj store",
        "owner_name": "Joseph",
        "phone": "7200780892",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.123416073511272,
            "lng": 80.20862148280952,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Joseph",
        "address": "12th street anjugam Nagar Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.123416073511272,
        "lng": 80.20862148280952,
        "assignedStaffId": "s3",
        "balance": 2000
    },
    {
        "id": "shop_64",
        "name": "Jothi Store",
        "owner_name": "Jothi Akka",
        "phone": "9445274690",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108711434130935,
            "lng": 80.20338973755764,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Jothi Akka",
        "address": "#3, Bajanai Koil Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108711434130935,
        "lng": 80.20338973755764,
        "assignedStaffId": "s4",
        "balance": 343
    },
    {
        "id": "shop_65",
        "name": "Jothi store",
        "owner_name": "Jagan",
        "phone": "7871033362",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.130840430436171,
            "lng": 80.21464491641639,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Jagan",
        "address": "31th street GKM colony Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.130840430436171,
        "lng": 80.21464491641639,
        "assignedStaffId": "s5",
        "balance": 1055
    },
    {
        "id": "shop_66",
        "name": "Kaikonda Ayyanar Store",
        "owner_name": "Kaikonda Raj",
        "phone": "7299488381",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.1278110047182,
            "lng": 80.21350257858016,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Kaikonda Raj",
        "address": "#127, Makkaram Thottam, North Redhills Road, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.1278110047182,
        "lng": 80.21350257858016,
        "assignedStaffId": "s6",
        "balance": 4296
    },
    {
        "id": "shop_67",
        "name": "Kalai Store",
        "owner_name": "Arunachalam",
        "phone": "9094798638",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.100306242441189,
            "lng": 80.19868914295266,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Arunachalam",
        "address": "#18/36 South Jaganathan Nagar, 1st Main Road, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.100306242441189,
        "lng": 80.19868914295266,
        "assignedStaffId": "s7",
        "balance": 1224
    },
    {
        "id": "shop_68",
        "name": "Kamatchi Store",
        "owner_name": "Kamatchi",
        "phone": "9444876295",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.104336018754205,
            "lng": 80.19828794892877,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Kamatchi",
        "address": "#68, Seeyalam 1st Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.104336018754205,
        "lng": 80.19828794892877,
        "assignedStaffId": "s8",
        "balance": 695
    },
    {
        "id": "shop_69",
        "name": "Kanchana Om Sai Ram",
        "owner_name": "Kanchana",
        "phone": "9941497742",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.129104557478513,
            "lng": 80.21380916145111,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Kanchana",
        "address": "#75A, Senthil Nagar 3rd Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.129104557478513,
        "lng": 80.21380916145111,
        "assignedStaffId": "s9",
        "balance": 4805
    },
    {
        "id": "shop_70",
        "name": "Kani Store",
        "owner_name": "Tamizh",
        "phone": "8610057588",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Tamizh",
        "address": "#36, Thiruvedhiamman Koil Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s10",
        "balance": 2063
    },
    {
        "id": "shop_71",
        "name": "Kani Store",
        "owner_name": "Unknown",
        "phone": "9003279418",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108392839687044,
            "lng": 80.19676322871456,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#7/70, 54th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108392839687044,
        "lng": 80.19676322871456,
        "assignedStaffId": "s11",
        "balance": 1209
    },
    {
        "id": "shop_72",
        "name": "Kannan Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107369254550592,
            "lng": 80.20996337445428,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#292, 9th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.107369254550592,
        "lng": 80.20996337445428,
        "assignedStaffId": "s12",
        "balance": 886
    },
    {
        "id": "shop_73",
        "name": "Karhtikeyan Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#47, 2nd Steet, Chennai Battai Road, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s13",
        "balance": 4324
    },
    {
        "id": "shop_74",
        "name": "Karpagam Store",
        "owner_name": "Karpagam",
        "phone": "8946091057",
        "area": "Chennai",
        "zone": "Zone A",
        "geo": {
            "lat": 13.105125447512231,
            "lng": 80.20441538862883,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Karpagam",
        "address": "23th street GKM Colony Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.105125447512231,
        "lng": 80.20441538862883,
        "assignedStaffId": "s14",
        "balance": 500
    },
    {
        "id": "shop_75",
        "name": "Kasthuri Ammal Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10628815573314,
            "lng": 80.20775193179897,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#91, South Mada Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.10628815573314,
        "lng": 80.20775193179897,
        "assignedStaffId": "s15",
        "balance": 1369
    },
    {
        "id": "shop_76",
        "name": "Kavitha Store",
        "owner_name": "Murugan",
        "phone": "9962295003",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.109440482093385,
            "lng": 80.20222870199802,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Murugan",
        "address": "#9/313, 48th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.109440482093385,
        "lng": 80.20222870199802,
        "assignedStaffId": "s1",
        "balance": 4962
    },
    {
        "id": "shop_77",
        "name": "Kavitha Store",
        "owner_name": "Murugesan",
        "phone": "8124988650",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107209924510197,
            "lng": 80.20333995715711,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Murugesan",
        "address": "#2, Babanagar, 2nd Mainroad, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.107209924510197,
        "lng": 80.20333995715711,
        "assignedStaffId": "s2",
        "balance": 3967
    },
    {
        "id": "shop_78",
        "name": "Kavitha Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#121, Mahatma Gandhi Nagar Mainroad, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s3",
        "balance": 2405
    },
    {
        "id": "shop_79",
        "name": "Kavitha Store",
        "owner_name": "Unknown Owner",
        "phone": "9566114562",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.124445865301036,
            "lng": 80.21101336537369,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown Owner",
        "address": "#121, Mahatma Gandhi Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.124445865301036,
        "lng": 80.21101336537369,
        "assignedStaffId": "s4",
        "balance": 2641
    },
    {
        "id": "shop_80",
        "name": "Kaviya Store",
        "owner_name": "Chandra Shekar",
        "phone": "7845195568",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.104048890451136,
            "lng": 80.19846544595036,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Chandra Shekar",
        "address": "#E3/101-1, 28th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.104048890451136,
        "lng": 80.19846544595036,
        "assignedStaffId": "s5",
        "balance": 2891
    },
    {
        "id": "shop_81",
        "name": "Kavya store",
        "owner_name": "Chandra Shekhar",
        "phone": "7845195568",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.101566773425834,
            "lng": 80.20134444856728,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Chandra Shekhar",
        "address": "28st street sidco Nagar Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.101566773425834,
        "lng": 80.20134444856728,
        "assignedStaffId": "s6",
        "balance": 4093
    },
    {
        "id": "shop_82",
        "name": "Keerthana Store",
        "owner_name": "Unknown",
        "phone": "8056702089",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10103886541689,
            "lng": 80.20088149936915,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#33/34, Teachers Guiltcolony, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10103886541689,
        "lng": 80.20088149936915,
        "assignedStaffId": "s7",
        "balance": 1196
    },
    {
        "id": "shop_83",
        "name": "Keerthana Store",
        "owner_name": "Thangaraj",
        "phone": "8056702089",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.109950878722215,
            "lng": 80.20216092197188,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Thangaraj",
        "address": "#33/34, Teachers Guild Colony Mainroad, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.109950878722215,
        "lng": 80.20216092197188,
        "assignedStaffId": "s8",
        "balance": 4543
    },
    {
        "id": "shop_84",
        "name": "Kirubai store",
        "owner_name": "Jai Kumar",
        "phone": "7904468027",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.124059400902452,
            "lng": 80.21756312829231,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Jai Kumar",
        "address": "11th cross street poopuhar nagar Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.124059400902452,
        "lng": 80.21756312829231,
        "assignedStaffId": "s9",
        "balance": 4907
    },
    {
        "id": "shop_85",
        "name": "Kkk store",
        "owner_name": "Malliga",
        "phone": "9962295003",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.110381209311612,
            "lng": 80.20279926259408,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Malliga",
        "address": "48th street sidco Nagar Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.110381209311612,
        "lng": 80.20279926259408,
        "assignedStaffId": "s10",
        "balance": 3650
    },
    {
        "id": "shop_86",
        "name": "KP Krishna Karthik",
        "owner_name": "Krishna",
        "phone": "6369702178",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.11123302031101,
            "lng": 80.19928475293582,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Krishna",
        "address": "#21/1, 1st Mainroad, Nehru Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.11123302031101,
        "lng": 80.19928475293582,
        "assignedStaffId": "s11",
        "balance": 3311
    },
    {
        "id": "shop_87",
        "name": "Krishna Store",
        "owner_name": "Murthy",
        "phone": "9962204705",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.102849493834464,
            "lng": 80.19723072053395,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Murthy",
        "address": "#32, Narayana Murthy Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.102849493834464,
        "lng": 80.19723072053395,
        "assignedStaffId": "s12",
        "balance": 3710
    },
    {
        "id": "shop_88",
        "name": "Kumar Store",
        "owner_name": "Kumar",
        "phone": "9884423156",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.101417915603376,
            "lng": 80.21057482658063,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Kumar",
        "address": "#13, Valliammal 1st Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.101417915603376,
        "lng": 80.21057482658063,
        "assignedStaffId": "s13",
        "balance": 247
    },
    {
        "id": "shop_89",
        "name": "Lingammala store",
        "owner_name": "Nagaraj",
        "phone": "9962173282",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.131688279152108,
            "lng": 80.2055688513394,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Nagaraj",
        "address": "Jevatha street 32st street GKM colony Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.131688279152108,
        "lng": 80.2055688513394,
        "assignedStaffId": "s14",
        "balance": 3281
    },
    {
        "id": "shop_90",
        "name": "M F General Store",
        "owner_name": "Gayasuddin",
        "phone": "944225348",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.113351045683338,
            "lng": 80.19669495065182,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Gayasuddin",
        "address": "#1, Thiruvedhiamman Koil Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.113351045683338,
        "lng": 80.19669495065182,
        "assignedStaffId": "s15",
        "balance": 945
    },
    {
        "id": "shop_91",
        "name": "M k store",
        "owner_name": "Kannarayam",
        "phone": "9444787543",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.131619698852578,
            "lng": 80.21534663645657,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Kannarayam",
        "address": "29th street GKM Colony Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.131619698852578,
        "lng": 80.21534663645657,
        "assignedStaffId": "s1",
        "balance": 606
    },
    {
        "id": "shop_92",
        "name": "Madasami Store",
        "owner_name": "Mariappan",
        "phone": "9444420759",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Mariappan",
        "address": "#6/107, 3rd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s2",
        "balance": 3494
    },
    {
        "id": "shop_93",
        "name": "Maghizhini Store",
        "owner_name": "Unknown",
        "phone": "7010743572",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#10, Mannadi Othavadai Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s3",
        "balance": 911
    },
    {
        "id": "shop_94",
        "name": "Mahadi Store",
        "owner_name": "Unknown Owner",
        "phone": "9790805529",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.12336790647402,
            "lng": 80.20847589318164,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown Owner",
        "address": "#72, Thenpazhani Nagar, Anna Street, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.12336790647402,
        "lng": 80.20847589318164,
        "assignedStaffId": "s4",
        "balance": 1142
    },
    {
        "id": "shop_95",
        "name": "Mahadi Store",
        "owner_name": "Siva Kumar",
        "phone": "9790805529",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.121290155631268,
            "lng": 80.21202208319673,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Siva Kumar",
        "address": "#72. Thenpazhani Nagar, Anna Street, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.121290155631268,
        "lng": 80.21202208319673,
        "assignedStaffId": "s5",
        "balance": 3420
    },
    {
        "id": "shop_96",
        "name": "Maharaja Store",
        "owner_name": "Kutti",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10794268593222,
            "lng": 80.19995966471616,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Kutti",
        "address": "#10, Petter Street, Rajaji Nagar, Villivakkam, Chennai 49",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.10794268593222,
        "lng": 80.19995966471616,
        "assignedStaffId": "s6",
        "balance": 2232
    },
    {
        "id": "shop_97",
        "name": "Mahesh Home Needs",
        "owner_name": "Mahendran",
        "phone": "9884214090",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.113114955041635,
            "lng": 80.20802750468908,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Mahendran",
        "address": "#35, Janakiram Colony, 1st Street, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.113114955041635,
        "lng": 80.20802750468908,
        "assignedStaffId": "s7",
        "balance": 4125
    },
    {
        "id": "shop_98",
        "name": "Mailraj",
        "owner_name": "Mailraja",
        "phone": "9363903128",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.128628575017318,
            "lng": 80.21332815316572,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Mailraja",
        "address": "#123, Mahatma Gandhi Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.128628575017318,
        "lng": 80.21332815316572,
        "assignedStaffId": "s8",
        "balance": 1887
    },
    {
        "id": "shop_99",
        "name": "Mailraj Store",
        "owner_name": "Mailrajan",
        "phone": "9363903128",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Mailrajan",
        "address": "#123, Mahatma Gandhi Nagar Mainroad, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s9",
        "balance": 2194
    },
    {
        "id": "shop_100",
        "name": "Mala Palani store",
        "owner_name": "Palani",
        "phone": "9677046722",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.1115693100839,
            "lng": 80.19890639004213,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Palani",
        "address": "Thiruveethi Amman Koil St, Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.1115693100839,
        "lng": 80.19890639004213,
        "assignedStaffId": "s10",
        "balance": 3199
    },
    {
        "id": "shop_101",
        "name": "Mala Pazhani Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#10, Thiruvedhiamman Koil Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s11",
        "balance": 2128
    },
    {
        "id": "shop_102",
        "name": "Malar Vizhi Store",
        "owner_name": "Unknown",
        "phone": "9940506997",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10170300542921,
            "lng": 80.21017829704786,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#3/63, 25th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10170300542921,
        "lng": 80.21017829704786,
        "assignedStaffId": "s12",
        "balance": 4496
    },
    {
        "id": "shop_103",
        "name": "Malliga store",
        "owner_name": "Kutty",
        "phone": "98411467441",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.114219517175536,
            "lng": 80.2090853060867,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Kutty",
        "address": "East made street Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.114219517175536,
        "lng": 80.2090853060867,
        "assignedStaffId": "s13",
        "balance": 1514
    },
    {
        "id": "shop_104",
        "name": "Mani Store",
        "owner_name": "Mani",
        "phone": "8939086462",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108554222424353,
            "lng": 80.20776558410303,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Mani",
        "address": "#10/147, 2nd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108554222424353,
        "lng": 80.20776558410303,
        "assignedStaffId": "s14",
        "balance": 1958
    },
    {
        "id": "shop_105",
        "name": "Maria Store",
        "owner_name": "Unknown Owner",
        "phone": "8925337446",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.124819654767737,
            "lng": 80.21151072106537,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown Owner",
        "address": "#72, Balaraman Street, Rajan Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.124819654767737,
        "lng": 80.21151072106537,
        "assignedStaffId": "s15",
        "balance": 354
    },
    {
        "id": "shop_106",
        "name": "Marry Store",
        "owner_name": "Petter",
        "phone": "9941131445",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.106824765460331,
            "lng": 80.20680888907265,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Petter",
        "address": "#31/11, 2nd Mainroad, Rajamangalam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106824765460331,
        "lng": 80.20680888907265,
        "assignedStaffId": "s1",
        "balance": 2586
    },
    {
        "id": "shop_107",
        "name": "Megala Enterprises",
        "owner_name": "Nirmal Kumar",
        "phone": "7338768348",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.106412383885862,
            "lng": 80.20341957050181,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Nirmal Kumar",
        "address": "#4/207, 6th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106412383885862,
        "lng": 80.20341957050181,
        "assignedStaffId": "s2",
        "balance": 535
    },
    {
        "id": "shop_108",
        "name": "Michael store",
        "owner_name": "Michael",
        "phone": "9884171196",
        "area": "Chennai",
        "zone": "Zone A",
        "geo": {
            "lat": 13.106472732925793,
            "lng": 80.20086980334187,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Michael",
        "address": "Balasubramaniam GKM Colony Salai Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106472732925793,
        "lng": 80.20086980334187,
        "assignedStaffId": "s3",
        "balance": 2083
    },
    {
        "id": "shop_109",
        "name": "Michel Store",
        "owner_name": "Milton",
        "phone": "7708986185",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.103963474359265,
            "lng": 80.20918594139353,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Milton",
        "address": "#41, Kamrajar Nagar, Thathankuppam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.103963474359265,
        "lng": 80.20918594139353,
        "assignedStaffId": "s4",
        "balance": 657
    },
    {
        "id": "shop_110",
        "name": "MMS Store",
        "owner_name": "Murugan",
        "phone": "9566075152",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.123667149114638,
            "lng": 80.21172019253736,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Murugan",
        "address": "#287, 3rd Street, Ambedkar Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.123667149114638,
        "lng": 80.21172019253736,
        "assignedStaffId": "s5",
        "balance": 273
    },
    {
        "id": "shop_111",
        "name": "MR Store",
        "owner_name": "Unknown",
        "phone": "9444061623",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.1002701703842,
            "lng": 80.2102697619773,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#12/27C, Seeyalam Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.1002701703842,
        "lng": 80.2102697619773,
        "assignedStaffId": "s6",
        "balance": 2246
    },
    {
        "id": "shop_112",
        "name": "MRK Store",
        "owner_name": "Karthik",
        "phone": "6383295131",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108349863809593,
            "lng": 80.20158666247423,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Karthik",
        "address": "#45, Bajanai Koil Street, Thathankuppam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108349863809593,
        "lng": 80.20158666247423,
        "assignedStaffId": "s7",
        "balance": 382
    },
    {
        "id": "shop_113",
        "name": "MS Thangavel Vegetable Shop",
        "owner_name": "Thangavel",
        "phone": "9444081021",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.126025600144658,
            "lng": 80.22047365673797,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Thangavel",
        "address": "#26A/1, Srinivasa Nagar 2nd Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.126025600144658,
        "lng": 80.22047365673797,
        "assignedStaffId": "s8",
        "balance": 4523
    },
    {
        "id": "shop_114",
        "name": "Murugan Store",
        "owner_name": "Periyasami",
        "phone": "6379882902",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.102175310753749,
            "lng": 80.19759453964966,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Periyasami",
        "address": "#5/72, E Type, 9th Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.102175310753749,
        "lng": 80.19759453964966,
        "assignedStaffId": "s9",
        "balance": 716
    },
    {
        "id": "shop_115",
        "name": "Murugan Store",
        "owner_name": "Ravi",
        "phone": "9790764931",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.114481604100918,
            "lng": 80.20283310386934,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Ravi",
        "address": "#14, Amman Koil 10th Street, Thathankuppam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.114481604100918,
        "lng": 80.20283310386934,
        "assignedStaffId": "s10",
        "balance": 3430
    },
    {
        "id": "shop_116",
        "name": "Murugan Store",
        "owner_name": "Murugan",
        "phone": "9445603743",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.106498770172692,
            "lng": 80.20818609066045,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Murugan",
        "address": "#1, Valliammal 1st Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106498770172692,
        "lng": 80.20818609066045,
        "assignedStaffId": "s11",
        "balance": 3082
    },
    {
        "id": "shop_117",
        "name": "Muthu Sankari Store",
        "owner_name": "Sankara Pandiyan",
        "phone": "740142899",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.119193971297907,
            "lng": 80.21666581368883,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Sankara Pandiyan",
        "address": "#1/3, Thenpazhani Nagar Extension, MGR Nagar, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.119193971297907,
        "lng": 80.21666581368883,
        "assignedStaffId": "s12",
        "balance": 1590
    },
    {
        "id": "shop_118",
        "name": "Muthu Store",
        "owner_name": "Muthu",
        "phone": "8939324364",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.105860873183229,
            "lng": 80.20892215332759,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Muthu",
        "address": "#69, Amman Kuttai, Kamarajar Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.105860873183229,
        "lng": 80.20892215332759,
        "assignedStaffId": "s13",
        "balance": 345
    },
    {
        "id": "shop_119",
        "name": "Muthu store",
        "owner_name": "Muthu",
        "phone": "8939324364",
        "area": "Chennai",
        "zone": "Zone A",
        "geo": {
            "lat": 13.106982900071028,
            "lng": 80.21001974817727,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Muthu",
        "address": "Ammankuttai",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106982900071028,
        "lng": 80.21001974817727,
        "assignedStaffId": "s14",
        "balance": 4150
    },
    {
        "id": "shop_120",
        "name": "Nellai Store",
        "owner_name": "Aziz Rehman",
        "phone": "9884170150",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10505979139051,
            "lng": 80.2038076753805,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Aziz Rehman",
        "address": "#32, Kamarajar Nagar, Thathankuppam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10505979139051,
        "lng": 80.2038076753805,
        "assignedStaffId": "s15",
        "balance": 4547
    },
    {
        "id": "shop_121",
        "name": "New Kadambur Sakthi Store",
        "owner_name": "Vaina Perumal",
        "phone": "9094806177",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.130313771359035,
            "lng": 80.20990641969881,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Vaina Perumal",
        "address": "#223, Ambedkar Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.130313771359035,
        "lng": 80.20990641969881,
        "assignedStaffId": "s1",
        "balance": 2381
    },
    {
        "id": "shop_122",
        "name": "New Krishna store",
        "owner_name": "Ramakrishna",
        "phone": "9952017976",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.121754915463328,
            "lng": 80.21551296887328,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Ramakrishna",
        "address": "2th main road Murugan Nagar Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.121754915463328,
        "lng": 80.21551296887328,
        "assignedStaffId": "s2",
        "balance": 3735
    },
    {
        "id": "shop_123",
        "name": "New Lakshmi Store",
        "owner_name": "Soundharajan",
        "phone": "9677908461",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10644002821045,
            "lng": 80.19951043915758,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Soundharajan",
        "address": "#14, 5th Street, Rajaji Nagar, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10644002821045,
        "lng": 80.19951043915758,
        "assignedStaffId": "s3",
        "balance": 997
    },
    {
        "id": "shop_124",
        "name": "New Shankar Store",
        "owner_name": "Shankar",
        "phone": "9710123562",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.102823156610937,
            "lng": 80.20281596167453,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Shankar",
        "address": "#7/562, 3rd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.102823156610937,
        "lng": 80.20281596167453,
        "assignedStaffId": "s4",
        "balance": 1487
    },
    {
        "id": "shop_125",
        "name": "New Sri Murugan Store",
        "owner_name": "Murali",
        "phone": "9445871939",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.119412118088137,
            "lng": 80.22005360059715,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Murali",
        "address": "#226, 3rd Street, Ambedkar Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.119412118088137,
        "lng": 80.22005360059715,
        "assignedStaffId": "s5",
        "balance": 2506
    },
    {
        "id": "shop_126",
        "name": "Nithya News Mart",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#1, Makkaram Thottam, North Redhills Road, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s6",
        "balance": 2295
    },
    {
        "id": "shop_127",
        "name": "Nithya News Mart",
        "owner_name": "Xxxxxxx",
        "phone": "000000",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.126007339260363,
            "lng": 80.21545351113758,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Xxxxxxx",
        "address": "#1, North Redhills Road, Makkaram Thottam, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.126007339260363,
        "lng": 80.21545351113758,
        "assignedStaffId": "s7",
        "balance": 1312
    },
    {
        "id": "shop_128",
        "name": "Om Sakthi Store",
        "owner_name": "Moothi",
        "phone": "9789023020",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.100559770998085,
            "lng": 80.20377352011175,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Moothi",
        "address": "#43/19, Dhayalu Nagar, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.100559770998085,
        "lng": 80.20377352011175,
        "assignedStaffId": "s8",
        "balance": 1931
    },
    {
        "id": "shop_129",
        "name": "Om Sakthi Store",
        "owner_name": "Unknown",
        "phone": "9444041043",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#66, Thanthoniamman 1st Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s9",
        "balance": 421
    },
    {
        "id": "shop_130",
        "name": "Orange store",
        "owner_name": "Bala murugan",
        "phone": "9884199408",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.123522683223687,
            "lng": 80.2138422616065,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Bala murugan",
        "address": "Jambulingam Kolathur Chennai 98",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.123522683223687,
        "lng": 80.2138422616065,
        "assignedStaffId": "s10",
        "balance": 1687
    },
    {
        "id": "shop_131",
        "name": "P K Store",
        "owner_name": "Naidu",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10965281930005,
            "lng": 80.19669050781823,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Naidu",
        "address": "#57/28, Sivan Koil, Merkkumada Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.10965281930005,
        "lng": 80.19669050781823,
        "assignedStaffId": "s11",
        "balance": 93
    },
    {
        "id": "shop_132",
        "name": "Padma Store",
        "owner_name": "Unknown Owner",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.105626859323252,
            "lng": 80.20614617961716,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown Owner",
        "address": "#58, Annai Indira Nagar 2nd Street, Villivakkam, Chennai 49",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.105626859323252,
        "lng": 80.20614617961716,
        "assignedStaffId": "s12",
        "balance": 149
    },
    {
        "id": "shop_133",
        "name": "Padmaiah Store",
        "owner_name": "Padmaiah",
        "phone": "9003015476",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.128030393331489,
            "lng": 80.21306101820959,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Padmaiah",
        "address": "#54/3, Mahatma Gandhi Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.128030393331489,
        "lng": 80.21306101820959,
        "assignedStaffId": "s13",
        "balance": 633
    },
    {
        "id": "shop_134",
        "name": "Padmaiah Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#54/3, Mahatma Gandhi Nagar Mainroad, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s14",
        "balance": 2138
    },
    {
        "id": "shop_135",
        "name": "Palavesam Murugan Store",
        "owner_name": "Murugan",
        "phone": "9948787304",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Murugan",
        "address": "#16, Thirumurugan Nagar, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s15",
        "balance": 2873
    },
    {
        "id": "shop_136",
        "name": "Parvathi Store",
        "owner_name": "Chokkan",
        "phone": "9710323281",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.100749360778446,
            "lng": 80.20472404759651,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Chokkan",
        "address": "#16A, Rangadoss Colony, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.100749360778446,
        "lng": 80.20472404759651,
        "assignedStaffId": "s1",
        "balance": 657
    },
    {
        "id": "shop_137",
        "name": "Parvathi Store",
        "owner_name": "Chokkan",
        "phone": "9710323281",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.106113850694873,
            "lng": 80.19959479623924,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Chokkan",
        "address": "#16A, Rangadoss Colony, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106113850694873,
        "lng": 80.19959479623924,
        "assignedStaffId": "s2",
        "balance": 4780
    },
    {
        "id": "shop_138",
        "name": "Periyasami 2",
        "owner_name": "Pechiammal",
        "phone": "9003274500",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.109566657740514,
            "lng": 80.20739109576361,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Pechiammal",
        "address": "#29C, 1st Street, North Jaganathan Nagar, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.109566657740514,
        "lng": 80.20739109576361,
        "assignedStaffId": "s3",
        "balance": 2828
    },
    {
        "id": "shop_139",
        "name": "Periyasami Store 1",
        "owner_name": "Periyasami",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.113631579797998,
            "lng": 80.20577929146489,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Periyasami",
        "address": "21 Babanagar Villivakkam Chennai-600049",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.113631579797998,
        "lng": 80.20577929146489,
        "assignedStaffId": "s4",
        "balance": 587
    },
    {
        "id": "shop_140",
        "name": "Prabha Store",
        "owner_name": "Thiraviam",
        "phone": "9841361926",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.112140079892844,
            "lng": 80.20989643599631,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Thiraviam",
        "address": "#17/18, 1st Mainroad, Thathankuppam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.112140079892844,
        "lng": 80.20989643599631,
        "assignedStaffId": "s5",
        "balance": 2561
    },
    {
        "id": "shop_141",
        "name": "Praveen Store",
        "owner_name": "Unknown",
        "phone": "6369515670",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.113824277864369,
            "lng": 80.20337298353307,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#369, 59th Street, Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.113824277864369,
        "lng": 80.20337298353307,
        "assignedStaffId": "s6",
        "balance": 4463
    },
    {
        "id": "shop_142",
        "name": "Priya Store",
        "owner_name": "Unknown",
        "phone": "9176513719",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10456660450861,
            "lng": 80.20074333669976,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#43, Balaramapuram Mainroad, Villivakkam Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10456660450861,
        "lng": 80.20074333669976,
        "assignedStaffId": "s7",
        "balance": 4725
    },
    {
        "id": "shop_143",
        "name": "Pushpam Store",
        "owner_name": "Unknown Owner",
        "phone": "9677237043",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.117935175114598,
            "lng": 80.21500227773953,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown Owner",
        "address": "#5, Siva Sakthi Nagar Extension, 4th Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.117935175114598,
        "lng": 80.21500227773953,
        "assignedStaffId": "s8",
        "balance": 1971
    },
    {
        "id": "shop_144",
        "name": "Pushpam Store",
        "owner_name": "Unknown",
        "phone": "9677237043",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#5, Sivasakthi Nagar, 3rd Street, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s9",
        "balance": 4613
    },
    {
        "id": "shop_145",
        "name": "Rahmath Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#26B, Lakshmi Nagar Mainroad, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s10",
        "balance": 2645
    },
    {
        "id": "shop_146",
        "name": "Raja Store",
        "owner_name": "Raja",
        "phone": "9884112914",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Raja",
        "address": "#122, Sivasakthi Nagar, 3rd Street, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s11",
        "balance": 3268
    },
    {
        "id": "shop_147",
        "name": "Raja Store",
        "owner_name": "Raja",
        "phone": "7418085835",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.111181843335505,
            "lng": 80.20996277670349,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Raja",
        "address": "#68/155, 2nd Street, Bharathi Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.111181843335505,
        "lng": 80.20996277670349,
        "assignedStaffId": "s12",
        "balance": 1190
    },
    {
        "id": "shop_148",
        "name": "Raja Store",
        "owner_name": "Raja",
        "phone": "9884112914",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.122504441047,
            "lng": 80.2078143492041,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Raja",
        "address": "#122, Siva Sakthi Nagar, 3rd Street, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.122504441047,
        "lng": 80.2078143492041,
        "assignedStaffId": "s13",
        "balance": 4815
    },
    {
        "id": "shop_149",
        "name": "Ratna Store",
        "owner_name": "Dhanasekar",
        "phone": "9500162217",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.110244787922829,
            "lng": 80.19694364355358,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Dhanasekar",
        "address": "#21, Janakiram Colony, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.110244787922829,
        "lng": 80.19694364355358,
        "assignedStaffId": "s14",
        "balance": 1218
    },
    {
        "id": "shop_150",
        "name": "Ravikumar Store",
        "owner_name": "Ravi Kumar",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107283761811244,
            "lng": 80.21029533900295,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Ravi Kumar",
        "address": "#6/202, 87th Street, 3rd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.107283761811244,
        "lng": 80.21029533900295,
        "assignedStaffId": "s15",
        "balance": 3345
    },
    {
        "id": "shop_151",
        "name": "Rehmath Store",
        "owner_name": "Jalal",
        "phone": "9941305310",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.121933301686674,
            "lng": 80.21144600494213,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Jalal",
        "address": "#26B, Lakshmi Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.121933301686674,
        "lng": 80.21144600494213,
        "assignedStaffId": "s1",
        "balance": 2124
    },
    {
        "id": "shop_152",
        "name": "Revathi Store",
        "owner_name": "Vasanthi",
        "phone": "9655871645",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.106662070770017,
            "lng": 80.20601723177838,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Vasanthi",
        "address": "#71, Seeyalam Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106662070770017,
        "lng": 80.20601723177838,
        "assignedStaffId": "s2",
        "balance": 247
    },
    {
        "id": "shop_153",
        "name": "Revathi Store",
        "owner_name": "Manoharan",
        "phone": "9840695895",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.11090614090383,
            "lng": 80.20957579662799,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Manoharan",
        "address": "#9, Jaganathan Nagar, 7th Cross Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.11090614090383,
        "lng": 80.20957579662799,
        "assignedStaffId": "s3",
        "balance": 3538
    },
    {
        "id": "shop_154",
        "name": "Royal News mart",
        "owner_name": "Gajendran",
        "phone": "9941820033",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.11420272622435,
            "lng": 80.19795373955245,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Gajendran",
        "address": "2th Main road sidco Nagar Villivakkam Chennai 42",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.11420272622435,
        "lng": 80.19795373955245,
        "assignedStaffId": "s4",
        "balance": 4837
    },
    {
        "id": "shop_155",
        "name": "RR Foods",
        "owner_name": "Daniel",
        "phone": "9176580217",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.109296475004186,
            "lng": 80.20300082659651,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Daniel",
        "address": "#61/10, Seeyalam Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.109296475004186,
        "lng": 80.20300082659651,
        "assignedStaffId": "s5",
        "balance": 249
    },
    {
        "id": "shop_156",
        "name": "RR Stores",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.104049465196551,
            "lng": 80.19978909329109,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#10, 93rd Street, Near Angalamman Koil, Sidco Nagar, Villivakkam, Chrnnai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.104049465196551,
        "lng": 80.19978909329109,
        "assignedStaffId": "s6",
        "balance": 2811
    },
    {
        "id": "shop_157",
        "name": "Rusigaram Jucie Shop",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.100284815872314,
            "lng": 80.19785634517285,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#207, C Type 4th Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.100284815872314,
        "lng": 80.19785634517285,
        "assignedStaffId": "s7",
        "balance": 3981
    },
    {
        "id": "shop_158",
        "name": "Sakthivel store",
        "owner_name": "Mohan",
        "phone": "9283773039",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10023362960453,
            "lng": 80.20510565291852,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Mohan",
        "address": "Thiruveethi Amman Koil St, Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10023362960453,
        "lng": 80.20510565291852,
        "assignedStaffId": "s8",
        "balance": 3127
    },
    {
        "id": "shop_159",
        "name": "Sangeetha Store",
        "owner_name": "Arunachalam",
        "phone": "9940510572",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.128451840749499,
            "lng": 80.21459522986909,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Arunachalam",
        "address": "#15, 1st Mainroad, Siva Sakthi Nagar, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.128451840749499,
        "lng": 80.21459522986909,
        "assignedStaffId": "s9",
        "balance": 385
    },
    {
        "id": "shop_160",
        "name": "Saran Store",
        "owner_name": "Gunashekar",
        "phone": "7397423774",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.105778454004557,
            "lng": 80.20811454817087,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Gunashekar",
        "address": "#151/E10, 2nd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.105778454004557,
        "lng": 80.20811454817087,
        "assignedStaffId": "s10",
        "balance": 694
    },
    {
        "id": "shop_161",
        "name": "Saravana store",
        "owner_name": "Shankar",
        "phone": "9884099692",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.127481804192984,
            "lng": 80.21214010340256,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Shankar",
        "address": "33st street GKM colony Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.127481804192984,
        "lng": 80.21214010340256,
        "assignedStaffId": "s11",
        "balance": 930
    },
    {
        "id": "shop_162",
        "name": "Selva Ayyanar Store",
        "owner_name": "Balu",
        "phone": "9841352616",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.127424143860305,
            "lng": 80.21423476762907,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Balu",
        "address": "#24, Neelakandan Street, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.127424143860305,
        "lng": 80.21423476762907,
        "assignedStaffId": "s12",
        "balance": 4668
    },
    {
        "id": "shop_163",
        "name": "Selvam Store",
        "owner_name": "Unknown",
        "phone": "8807259523",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.101932314802452,
            "lng": 80.1961521877361,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#196, 63rd Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.101932314802452,
        "lng": 80.1961521877361,
        "assignedStaffId": "s13",
        "balance": 2237
    },
    {
        "id": "shop_164",
        "name": "Selvam Store",
        "owner_name": "Selvam",
        "phone": "9710043730",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10999973578049,
            "lng": 80.20418808028349,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Selvam",
        "address": "#15/1, 2nd Street, Bharathi Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10999973578049,
        "lng": 80.20418808028349,
        "assignedStaffId": "s14",
        "balance": 1466
    },
    {
        "id": "shop_165",
        "name": "Selvamurugan Store",
        "owner_name": "Badrakali Raja",
        "phone": "9445289980",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.105333770142769,
            "lng": 80.2034569734551,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Badrakali Raja",
        "address": "#47/11, Mettu Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.105333770142769,
        "lng": 80.2034569734551,
        "assignedStaffId": "s15",
        "balance": 1601
    },
    {
        "id": "shop_166",
        "name": "Selvan Store",
        "owner_name": "Nehru",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.105022898818493,
            "lng": 80.20377665932756,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Nehru",
        "address": "#47/2, Seeyalam 1st Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.105022898818493,
        "lng": 80.20377665932756,
        "assignedStaffId": "s1",
        "balance": 4640
    },
    {
        "id": "shop_167",
        "name": "Selvaraj Store",
        "owner_name": "Selvaraj",
        "phone": "7358660537",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.123957660749328,
            "lng": 80.22035965539663,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Selvaraj",
        "address": "#168, 8th Cross Street Senthil Nagar, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.123957660749328,
        "lng": 80.22035965539663,
        "assignedStaffId": "s2",
        "balance": 4697
    },
    {
        "id": "shop_168",
        "name": "Selvaraj store",
        "owner_name": "Selvam",
        "phone": "9884757011",
        "area": "Chennai",
        "zone": "Zone A",
        "geo": {
            "lat": 13.112134711678758,
            "lng": 80.20313242292826,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Selvam",
        "address": "Periyar Nagar Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.112134711678758,
        "lng": 80.20313242292826,
        "assignedStaffId": "s3",
        "balance": 2260
    },
    {
        "id": "shop_169",
        "name": "Selvarani Store",
        "owner_name": "Selvarani",
        "phone": "7200395244",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10736038375462,
            "lng": 80.21085810600265,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Selvarani",
        "address": "#135/84, South Mada Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10736038375462,
        "lng": 80.21085810600265,
        "assignedStaffId": "s4",
        "balance": 16
    },
    {
        "id": "shop_170",
        "name": "Senthil Kumar Store",
        "owner_name": "Xxxxxxx",
        "phone": "0000000",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.12394837396366,
            "lng": 80.22012217635464,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Xxxxxxx",
        "address": "#268, Ambedkar Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.12394837396366,
        "lng": 80.22012217635464,
        "assignedStaffId": "s5",
        "balance": 4153
    },
    {
        "id": "shop_171",
        "name": "Senthil Kumar Store",
        "owner_name": "Srinivasan",
        "phone": "9962381747",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.12310860524616,
            "lng": 80.21308277422823,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Srinivasan",
        "address": "#268, Ambedkar Nagar Mainroad, 3rd Street, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.12310860524616,
        "lng": 80.21308277422823,
        "assignedStaffId": "s6",
        "balance": 3289
    },
    {
        "id": "shop_172",
        "name": "Siva Perumal Store",
        "owner_name": "Thanga Lakshmi",
        "phone": "9941601808",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.106203926433759,
            "lng": 80.20127423364346,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Thanga Lakshmi",
        "address": "#7/392, 53th Street, A Type, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.106203926433759,
        "lng": 80.20127423364346,
        "assignedStaffId": "s7",
        "balance": 4243
    },
    {
        "id": "shop_173",
        "name": "SMS Store",
        "owner_name": "Unknown",
        "phone": "9597140399",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.103161774444798,
            "lng": 80.20919727792064,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#35, Ambedkar Nagar 1st Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.103161774444798,
        "lng": 80.20919727792064,
        "assignedStaffId": "s8",
        "balance": 1970
    },
    {
        "id": "shop_174",
        "name": "Soundhar Shop",
        "owner_name": "Anand",
        "phone": "9941793955",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.100132243106337,
            "lng": 80.20598623528923,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Anand",
        "address": "#94, 5th Street, Balaramapuram Mainroad, Villivakkam Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.100132243106337,
        "lng": 80.20598623528923,
        "assignedStaffId": "s9",
        "balance": 4021
    },
    {
        "id": "shop_175",
        "name": "Soundhar store",
        "owner_name": "Chinnakutty",
        "phone": "9941793955",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.110190889181844,
            "lng": 80.21029687573069,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Chinnakutty",
        "address": "Sidco balarama puram Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.110190889181844,
        "lng": 80.21029687573069,
        "assignedStaffId": "s10",
        "balance": 2506
    },
    {
        "id": "shop_176",
        "name": "Sree Vaari Store",
        "owner_name": "Unknown Owner",
        "phone": "94333343357",
        "area": "Chennai",
        "zone": "Zone A",
        "geo": {
            "lat": 13.100775683845804,
            "lng": 80.20868723996891,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown Owner",
        "address": "25th street GKM colony Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.100775683845804,
        "lng": 80.20868723996891,
        "assignedStaffId": "s11",
        "balance": 1352
    },
    {
        "id": "shop_177",
        "name": "Sri Ayyanar store",
        "owner_name": "Jaya Kumar",
        "phone": "7305909795",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.102907324775618,
            "lng": 80.20341568265579,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Jaya Kumar",
        "address": "6st main road sidco Nagar Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.102907324775618,
        "lng": 80.20341568265579,
        "assignedStaffId": "s12",
        "balance": 2038
    },
    {
        "id": "shop_178",
        "name": "Sri Ayyanar Store",
        "owner_name": "Unknown",
        "phone": "9789902806",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.113831531827223,
            "lng": 80.20196246663026,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#7/265, 56th Street, A Type, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.113831531827223,
        "lng": 80.20196246663026,
        "assignedStaffId": "s13",
        "balance": 4447
    },
    {
        "id": "shop_179",
        "name": "Sri ayyanar store",
        "owner_name": "Siva",
        "phone": "8056168610",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.104956704499747,
            "lng": 80.20513075909523,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Siva",
        "address": "Sidco Nagar 61st street Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.104956704499747,
        "lng": 80.20513075909523,
        "assignedStaffId": "s14",
        "balance": 91
    },
    {
        "id": "shop_180",
        "name": "Sri Hari Store",
        "owner_name": "Veerasamy",
        "phone": "9444404849",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107721759503484,
            "lng": 80.19656688395875,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Veerasamy",
        "address": "#10, 7th Street, Rajamangalam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.107721759503484,
        "lng": 80.19656688395875,
        "assignedStaffId": "s15",
        "balance": 338
    },
    {
        "id": "shop_181",
        "name": "Sri Kaikondan Ayyanar Store",
        "owner_name": "Kaikondan",
        "phone": "7299488381",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Kaikondan",
        "address": "#127, Makkaram Thottam, North Redhills Road, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s1",
        "balance": 4739
    },
    {
        "id": "shop_182",
        "name": "Sri Sai Store",
        "owner_name": "Paranthaman",
        "phone": "9094238747",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.110269742889459,
            "lng": 80.20662709084414,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Paranthaman",
        "address": "#17, North Jaganathan Nagar, 1st Mainroad, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.110269742889459,
        "lng": 80.20662709084414,
        "assignedStaffId": "s2",
        "balance": 2421
    },
    {
        "id": "shop_183",
        "name": "Sri Selvam Store",
        "owner_name": "Unknown",
        "phone": "9445179320",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#2, Anusuya Nagar, 2nd Street, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": true,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s3",
        "balance": 722
    },
    {
        "id": "shop_184",
        "name": "Sri Selvam Store",
        "owner_name": "Selvam",
        "phone": "9445179320",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.123764861112907,
            "lng": 80.21146451876487,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Selvam",
        "address": "#2, Anusuya Nagar 2nd Street, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.123764861112907,
        "lng": 80.21146451876487,
        "assignedStaffId": "s4",
        "balance": 3185
    },
    {
        "id": "shop_185",
        "name": "Sri Sivasakthi Store",
        "owner_name": "Unknown Owner",
        "phone": "8072905295",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10027695640279,
            "lng": 80.19998252820763,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown Owner",
        "address": "#17, North Jaganathan Nagar,1st Mainroad, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10027695640279,
        "lng": 80.19998252820763,
        "assignedStaffId": "s5",
        "balance": 1888
    },
    {
        "id": "shop_186",
        "name": "Srinivasa Store",
        "owner_name": "Srinivasan",
        "phone": "7806964169",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.100448182771533,
            "lng": 80.20979907435172,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Srinivasan",
        "address": "#21/3, East Mada Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.100448182771533,
        "lng": 80.20979907435172,
        "assignedStaffId": "s6",
        "balance": 890
    },
    {
        "id": "shop_187",
        "name": "Srinivasa Store",
        "owner_name": "Unknown",
        "phone": "9841892445",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107446916587325,
            "lng": 80.20719588262989,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#5/11, Moppiliamman Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.107446916587325,
        "lng": 80.20719588262989,
        "assignedStaffId": "s7",
        "balance": 3003
    },
    {
        "id": "shop_188",
        "name": "Srinivasa Store",
        "owner_name": "Velmurugan",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Velmurugan",
        "address": "#9/14, 5th Street, Redhills Road, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s8",
        "balance": 4982
    },
    {
        "id": "shop_189",
        "name": "Srinivasan Store",
        "owner_name": "Jayaraman",
        "phone": "9940593527",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.123115287763959,
            "lng": 80.21054360068555,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Jayaraman",
        "address": "#16, MGR Nagar, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.123115287763959,
        "lng": 80.21054360068555,
        "assignedStaffId": "s9",
        "balance": 4090
    },
    {
        "id": "shop_190",
        "name": "Srinivasan store",
        "owner_name": "Srinivasan",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10820250793752,
            "lng": 80.19726530974788,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Srinivasan",
        "address": "East made street Villivakkam Chennai 49",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.10820250793752,
        "lng": 80.19726530974788,
        "assignedStaffId": "s10",
        "balance": 1499
    },
    {
        "id": "shop_191",
        "name": "SS Store",
        "owner_name": "Unknown",
        "phone": "9080515899",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.110056685491784,
            "lng": 80.20983367337104,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#7/134, 54th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.110056685491784,
        "lng": 80.20983367337104,
        "assignedStaffId": "s11",
        "balance": 1055
    },
    {
        "id": "shop_192",
        "name": "SS Store",
        "owner_name": "Unknown",
        "phone": "7299024124",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.109510111676705,
            "lng": 80.20964382727689,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#2, Seeyalam Street, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.109510111676705,
        "lng": 80.20964382727689,
        "assignedStaffId": "s12",
        "balance": 4822
    },
    {
        "id": "shop_193",
        "name": "SS Store",
        "owner_name": "Ayyanar",
        "phone": "9444882551",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.102379295191131,
            "lng": 80.20282533576817,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Ayyanar",
        "address": "#9/216, 48th Street, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.102379295191131,
        "lng": 80.20282533576817,
        "assignedStaffId": "s13",
        "balance": 2917
    },
    {
        "id": "shop_194",
        "name": "Sumathi Store",
        "owner_name": "Sundaravel",
        "phone": "9433343357",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107155551750623,
            "lng": 80.2047822673183,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Sundaravel",
        "address": "#16/01, Ganga Street, Rajaji Nagar, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.107155551750623,
        "lng": 80.2047822673183,
        "assignedStaffId": "s14",
        "balance": 282
    },
    {
        "id": "shop_195",
        "name": "Sumathi store",
        "owner_name": "Sivaraj",
        "phone": "8754502924",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.120847631480343,
            "lng": 80.20948429907877,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Sivaraj",
        "address": "11th Main road poompuhar nagar Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.120847631480343,
        "lng": 80.20948429907877,
        "assignedStaffId": "s15",
        "balance": 1143
    },
    {
        "id": "shop_196",
        "name": "Suwetha store",
        "owner_name": "Suwetha",
        "phone": "8939132807",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.114960650104333,
            "lng": 80.19695829468942,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Suwetha",
        "address": "South made street Villivakkam Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.114960650104333,
        "lng": 80.19695829468942,
        "assignedStaffId": "s1",
        "balance": 3820
    },
    {
        "id": "shop_197",
        "name": "T S Chelladurai Store",
        "owner_name": "CHELLADURAI",
        "phone": "8939313347",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.109373364254672,
            "lng": 80.20640634207936,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "CHELLADURAI",
        "address": "#5, Kamarajar Street, Rajaji Nagar, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.109373364254672,
        "lng": 80.20640634207936,
        "assignedStaffId": "s2",
        "balance": 165
    },
    {
        "id": "shop_198",
        "name": "T S Chelladurai Store",
        "owner_name": "CHELLADURAI",
        "phone": "8939313347",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.111577712143776,
            "lng": 80.20094204611439,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "CHELLADURAI",
        "address": "#5, Kamarajar Street, Rajaji Nagar, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.111577712143776,
        "lng": 80.20094204611439,
        "assignedStaffId": "s3",
        "balance": 1796
    },
    {
        "id": "shop_199",
        "name": "Tambhi Hotel",
        "owner_name": "Shankar",
        "phone": "6381255325",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.118795726511175,
            "lng": 80.2081605954041,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Shankar",
        "address": "#16, Dhayalu Nagar, 1st Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.118795726511175,
        "lng": 80.2081605954041,
        "assignedStaffId": "s4",
        "balance": 2434
    },
    {
        "id": "shop_200",
        "name": "Tamil Selvi Store",
        "owner_name": "Suresh",
        "phone": "9444622977",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.108256408991082,
            "lng": 80.20939296093002,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Suresh",
        "address": "#36, Bajanai Koil Street, Thathankuppam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.108256408991082,
        "lng": 80.20939296093002,
        "assignedStaffId": "s5",
        "balance": 3588
    },
    {
        "id": "shop_201",
        "name": "Tamilmaran Maligai Store",
        "owner_name": "Prakash",
        "phone": "9080354908",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.112674583711074,
            "lng": 80.20764299506892,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Prakash",
        "address": "#93/32, 2nd Street, Bharathi Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.112674583711074,
        "lng": 80.20764299506892,
        "assignedStaffId": "s6",
        "balance": 3882
    },
    {
        "id": "shop_202",
        "name": "Thirupathi store",
        "owner_name": "Thirupathi kumar",
        "phone": "8939555083",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.122725499769084,
            "lng": 80.20750541724682,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Thirupathi kumar",
        "address": "Appasamy street Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.122725499769084,
        "lng": 80.20750541724682,
        "assignedStaffId": "s7",
        "balance": 1574
    },
    {
        "id": "shop_203",
        "name": "TK Store",
        "owner_name": "Thamman Naidu",
        "phone": "9940202228",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.101501477556061,
            "lng": 80.1967452345087,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Thamman Naidu",
        "address": "#25/1, 6th Street, Rajamangalam, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.101501477556061,
        "lng": 80.1967452345087,
        "assignedStaffId": "s8",
        "balance": 1799
    },
    {
        "id": "shop_204",
        "name": "Vadivelu store",
        "owner_name": "Santhi",
        "phone": "",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.112695006385936,
            "lng": 80.20176634196224,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Santhi",
        "address": "East made street Villivakkam Chennai 49",
        "qualityScore": 40,
        "hasGeo": true,
        "hasContact": false,
        "lat": 13.112695006385936,
        "lng": 80.20176634196224,
        "assignedStaffId": "s9",
        "balance": 2908
    },
    {
        "id": "shop_205",
        "name": "Varsha Store",
        "owner_name": "Unknown",
        "phone": "7904576097",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.103104627178617,
            "lng": 80.20220337046086,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown",
        "address": "#6/184, 4th Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.103104627178617,
        "lng": 80.20220337046086,
        "assignedStaffId": "s10",
        "balance": 2883
    },
    {
        "id": "shop_206",
        "name": "Velmurugan Store",
        "owner_name": "Unknown",
        "phone": "",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 0,
            "lng": 0,
            "precision": "UNKNOWN"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 40,
        "owner": "Unknown",
        "address": "#26/1,Lakshmi Nagar Mainroad, Kolathur, Chennai 99, Kolathur",
        "qualityScore": 40,
        "hasGeo": false,
        "hasContact": false,
        "lat": null,
        "lng": null,
        "assignedStaffId": "s11",
        "balance": 3881
    },
    {
        "id": "shop_207",
        "name": "Velmurugan Store",
        "owner_name": "Velmurugan",
        "phone": "7871177123",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.119286666063239,
            "lng": 80.21231600562155,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Velmurugan",
        "address": "#26/1, Lakshmi Nagar Mainroad, Kolathur, Chennai 99",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.119286666063239,
        "lng": 80.21231600562155,
        "assignedStaffId": "s12",
        "balance": 2458
    },
    {
        "id": "shop_208",
        "name": "Velmurugan Store",
        "owner_name": "Arumugam",
        "phone": "8939636699",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.1074777215729,
            "lng": 80.1988321672753,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Arumugam",
        "address": "#42, 2nd Mainroad, North Jaganathan Nagar, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.1074777215729,
        "lng": 80.1988321672753,
        "assignedStaffId": "s13",
        "balance": 4970
    },
    {
        "id": "shop_209",
        "name": "Venba store",
        "owner_name": "Balachandran",
        "phone": "9841159642",
        "area": "Kolathur",
        "zone": "Zone K",
        "geo": {
            "lat": 13.12391471371719,
            "lng": 80.21068721304351,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Balachandran",
        "address": "34th street GKM Colony Kolathur Chennai 82",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.12391471371719,
        "lng": 80.21068721304351,
        "assignedStaffId": "s14",
        "balance": 2593
    },
    {
        "id": "shop_210",
        "name": "Zam Zam Shop",
        "owner_name": "Mohammed",
        "phone": "9841315003",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.10831179807085,
            "lng": 80.19937683549215,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Mohammed",
        "address": "#91, 3rd Mainroad, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.10831179807085,
        "lng": 80.19937683549215,
        "assignedStaffId": "s15",
        "balance": 4433
    },
    {
        "id": "shop_211",
        "name": "Zam Zam Store",
        "owner_name": "Nizar Ahmed",
        "phone": "9790635373",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.107218517157571,
            "lng": 80.21068999087377,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Nizar Ahmed",
        "address": "#7/210, 56th Street, A Type, Sidco Nagar, Villivakkam, Chennai 49, Villivakkam",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.107218517157571,
        "lng": 80.21068999087377,
        "assignedStaffId": "s1",
        "balance": 3265
    },
    {
        "id": "shop_212",
        "name": "Zulaiha Biryani",
        "owner_name": "Unknown Owner",
        "phone": "9500013955",
        "area": "Villivakkam",
        "zone": "Zone V",
        "geo": {
            "lat": 13.104746578749262,
            "lng": 80.20981376082702,
            "precision": "ROOFTOP"
        },
        "delivery": {
            "cadence": "DAILY",
            "delivery_days": {
                "mon": true,
                "wed": true,
                "fri": true
            },
            "priority": "NORMAL",
            "status": "ACTIVE",
            "last_delivery_at": "2025-02-15"
        },
        "data_quality_score": 90,
        "owner": "Unknown Owner",
        "address": "#163, North Redhills Road, Villivakkam, Chennai 49",
        "qualityScore": 90,
        "hasGeo": true,
        "hasContact": true,
        "lat": 13.104746578749262,
        "lng": 80.20981376082702,
        "assignedStaffId": "s2",
        "balance": 315
    }
];