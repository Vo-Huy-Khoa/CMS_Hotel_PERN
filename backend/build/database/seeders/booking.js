"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seederBooking = void 0;
const configs_1 = __importDefault(require("../../configs"));
const bookings = [
    {
        room_id: 4,
        client_id: 3,
        check_in: new Date(2023, 3, 15),
        check_out: new Date(2023, 3, 15),
        total_price: "2500000",
        status: "true",
    },
    {
        room_id: 5,
        client_id: 3,
        check_in: new Date(2023, 3, 1),
        check_out: new Date(2023, 3, 1),
        total_price: "2500000",
        status: "true",
    },
    {
        room_id: 4,
        client_id: 3,
        check_in: new Date(2023, 3, 1),
        check_out: new Date(2023, 3, 1),
        total_price: "2500000",
        status: "true",
    },
];
const seederBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start a transaction
        yield configs_1.default.query("BEGIN");
        // Insert each user in parallel
        yield Promise.all(bookings.map((booking) => __awaiter(void 0, void 0, void 0, function* () {
            const insertValues = [
                booking.room_id,
                booking.client_id,
                booking.check_in,
                booking.check_out,
                booking.total_price,
                booking.status,
            ];
            const insertQuery = "INSERT INTO bookings(room_id, client_id, check_in, check_out, total_price, status ) VALUES($1, $2, $3, $4, $5, $6)";
            yield configs_1.default.query(insertQuery, insertValues);
        })));
        // Commit the transaction
        const { rows } = yield configs_1.default.query("COMMIT");
        res.status(201).json(rows);
    }
    catch (err) {
        console.log(err);
        // Rollback the transaction if there was an error
        yield configs_1.default.query("ROLLBACK");
        res.status(500).json({ error: "Data seeding error" });
    }
});
exports.seederBooking = seederBooking;
