const mongoose = require('mongoose');
let conductorModel = require('../../model/conductor');
let db = mongoose.connection;


describe("Testing conductores", () => {
    beforeAll(function (done) {
        let mongoDb = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
        db.on('error', console.error.bind(console, "error al conectarse a la db"));
        db.once('open', function () {
            console.log("conectados a base de datos");
            done();
        })
    });

    afterEach(function (done) {
        conductorModel.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
    });
    afterAll(function (done) {
        db.close();
        done();
    })



    describe('conductor.findConductorById ', function () {
        it("debe devolver el conductor 1", (done) => {
            let conductor1 = new conductorModel({ cc: 123456789, nombres: "martin", apellidos: "jimenez", email: "majiar16@gmail.com", password: "password", activo: true, latitud: 10.936199, longitud: -74.781685 });

            conductorModel.add(conductor1, function (err, newconductor1) {
                if (err) console.log(err);
                let conductor2 = new conductorModel({ cc: 123456, nombres: "daniel", apellidos: "salinas", email: "daniel@gmail.com", password: "passwor2d", activo: true, latitud: 10.936199, longitud: -74.781685 });

                conductorModel.add(conductor2, function (err, newconductor2) {
                    if (err) console.log(err);
                    let conductor3 = new conductorModel({ cc: 123, nombres: "yitzhak", apellidos: "ruiz", email: "yit@gmail.com", password: "passwor23d", activo: true, latitud: 10.936199, longitud: -74.781685 });

                    conductorModel.add(conductor3, function (err, newconductor3) {
                        if (err) console.log(err);
                        conductorModel.findConductorById(newconductor1._id, function (err, targetconductor) {
                            expect(targetconductor.cc).toBe(123456789);
                            expect(targetconductor.nombres).toBe("martin");
                            expect(targetconductor.apellidos).toBe("jimenez");
                            expect(targetconductor.email).toBe("majiar16@gmail.com");
                            expect(targetconductor.activo).toBe(true);
                            expect(targetconductor.latitud).toBe(10.936199);
                            expect(targetconductor.longitud).toBe(-74.781685);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe("conductor.createInstance", () => {
        it("crear una instancia de conductor", (done) => {
            let conductor = conductorModel.createInstance(123456789, "martin jose", "jimenez Aragon", "majiar16@gmail.com", "martin", true, 10.936199, -74.781685);
            expect(conductor.cc).toBe(123456789);
            expect(conductor.nombres).toBe("martin jose");
            expect(conductor.apellidos).toBe("jimenez Aragon");
            expect(conductor.email).toBe("majiar16@gmail.com");
            expect(conductor.password).toBe("martin");
            expect(conductor.activo).toBe(true);
            expect(conductor.latitud).toBe(10.936199);
            expect(conductor.longitud).toBe(-74.781685);
            done();
        });
    });
    describe("conductor.add", () => {
        it("crear una instancia de conductor", (done) => {
            let conductor = conductorModel.createInstance(123456789, "martin jose", "jimenez Aragon", "majiar16@gmail.com", "martin", true, 10.936199, -74.781685);
            conductorModel.add(conductor, function(){
                expect(conductor.cc).toBe(123456789);
                expect(conductor.nombres).toBe("martin jose");
                expect(conductor.apellidos).toBe("jimenez Aragon");
                expect(conductor.email).toBe("majiar16@gmail.com");
                expect(conductor.activo).toBe(true);
                expect(conductor.latitud).toBe(10.936199);
                expect(conductor.longitud).toBe(-74.781685);
                done();
            });
        });
    });
    describe('conductor.removeById ', function () {
        it("no debe estar el objeto con id 1", (done) => {
            let conductor1 = new conductorModel({ cc: 123456789, nombres: "martin", apellidos: "jimenez", email: "majiar16@gmail.com", password: "password", activo: true, latitud: 10.936199, longitud: -74.781685 });

            conductorModel.add(conductor1, function (err, newconductor1) {
                // if (err) console.log(err);
                let conductor2 = new conductorModel({ cc: 123456, nombres: "daniel", apellidos: "salinas", email: "daniel@gmail.com", password: "passwor2d", activo: true, latitud: 10.936199, longitud: -74.781685 });

                conductorModel.add(conductor2, function (err, newconductor2) {
                    // if (err) console.log(err);
                    let conductor3 = new conductorModel({ cc: 123, nombres: "yitzhak", apellidos: "ruiz", email: "yit@gmail.com", password: "passwor23d", activo: true, latitud: 10.936199, longitud: -74.781685 });
                    
                    conductorModel.add(conductor3, function (err, newconductor3) {
                        if (err) console.log(err);
                        conductorModel.removeByID(newconductor1._id, function (err, doc) {
                            expect(doc.n).toBe(1);
                            expect(doc.nModified).toBe(1);
                            expect(doc.ok).toBe(1);
                            done();
                        });
                    });
                });
            });
        });
    });



});
