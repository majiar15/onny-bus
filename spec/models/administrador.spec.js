const mongoose = require('mongoose');
let administradorModel = require('../../model/administrador');
let db = mongoose.connection;


describe("Testing administradores", () => {
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
        administradorModel.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
    });
    afterAll(function (done) {
        db.close();
        done();
    })

    describe("administrador.createInstance", () => {
        it("crear una instancia de administrador", (done) => {
            let administrador = administradorModel.createInstance(123456789, "martin jose", "jimenez Aragon", "majiar16@gmail.com", "martin", true);
            expect(administrador.cc).toBe(123456789);
            expect(administrador.nombres).toBe("martin jose");
            expect(administrador.apellidos).toBe("jimenez Aragon");
            expect(administrador.email).toBe("majiar16@gmail.com");
            expect(administrador.password).toBe("martin");
            expect(administrador.activo).toBe(true);
            expect(administrador.rol).toBe('empleado');

            done();
        });
    });

    describe('administrador.findAdministradorById ', function () {
        it("debe devolver el administrador 1", (done) => {
            let administrador1 = new administradorModel({ cc: 123456789, nombres: "martin", apellidos: "jimenez", email: "majiar16@gmail.com", password: "password", activo: true, rol: 'empleado' });

            administradorModel.add(administrador1, function (err, newadministrador1) {
                if (err) console.log(err);
                let conductor2 = new administradorModel({ cc: 123456, nombres: "daniel", apellidos: "salinas", email: "daniel@gmail.com", password: "passwor2d", activo: true, rol: 'empleado' });

                administradorModel.add(conductor2, function (err, newadministrador2) {
                    if (err) console.log(err);
                    let conductor3 = new administradorModel({ cc: 123, nombres: "yitzhak", apellidos: "ruiz", email: "yit@gmail.com", password: "passwor23d", activo: true, rol: 'empleado' });

                    administradorModel.add(conductor3, function (err, newadministrador3) {
                        if (err) console.log(err);
                        administradorModel.findAdministradorById(newadministrador1._id, function (err, targetAdministrador) {
                            expect(targetAdministrador.cc).toBe(123456789);
                            expect(targetAdministrador.nombres).toBe("martin");
                            expect(targetAdministrador.apellidos).toBe("jimenez");
                            expect(targetAdministrador.email).toBe("majiar16@gmail.com");
                            expect(targetAdministrador.activo).toBe(true);
                            expect(targetAdministrador.rol).toBe('empleado');

                            done();
                        });
                    });
                });
            });
        });
    });


    describe("administrador.add", () => {
        it("crear una instancia de administrador", (done) => {
            let administrador = administradorModel.createInstance(123456789, "martin jose", "jimenez Aragon", "majiar16@gmail.com", "martin", true);
            administradorModel.add(administrador, function () {
                expect(administrador.cc).toBe(123456789);
                expect(administrador.nombres).toBe("martin jose");
                expect(administrador.apellidos).toBe("jimenez Aragon");
                expect(administrador.email).toBe("majiar16@gmail.com");
                expect(administrador.activo).toBe(true);
                expect(administrador.rol).toBe('empleado');

                done();
            });
        });
    });
    describe('administrador.removeById ', function () {
        it("no debe estar el administrador con id 1", (done) => {
            let administrador1 = new administradorModel({ cc: 123456789, nombres: "martin", apellidos: "jimenez", email: "majiar16@gmail.com", password: "password", activo: true, rol: 'empleado' });

            administradorModel.add(administrador1, function (err, newadministrador1) {
                if (err) console.log(err);
                let conductor2 = new administradorModel({ cc: 123456, nombres: "daniel", apellidos: "salinas", email: "daniel@gmail.com", password: "passwor2d", activo: true, rol: 'empleado' });

                administradorModel.add(conductor2, function (err, newadministrador2) {
                    if (err) console.log(err);
                    let conductor3 = new administradorModel({ cc: 123, nombres: "yitzhak", apellidos: "ruiz", email: "yit@gmail.com", password: "passwor23d", activo: true, rol: 'empleado' });

                    administradorModel.add(conductor3, function (err, newadministrador3) {
                        if (err) console.log(err);
                        administradorModel.removeByID(newadministrador1._id, function (err, doc) {
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
