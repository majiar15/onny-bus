const mongoose = require('mongoose');

let busModel = require('../../model/bus');
let db = mongoose.connection;


describe("Testing bus", () => {
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
        busModel.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
        
    });
    afterAll(function (done) {
        db.close();
        done();
    })



    describe('bus.findBusById ', function () {
        it("debe devolver el bus 1", (done) => {
            let bus1 = busModel.createInstance("dzl-96e",123);

            busModel.add(bus1, function (err, newBus1) {
                if (err) console.log(err);
                let bus2 = busModel.createInstance("qwe-a6e",321);

                busModel.add(bus2, function (err, newBus2) {
                    if (err) console.log(err);
                    let bus3 = busModel.createInstance("zxc-464",159);

                    busModel.add(bus3, function (err, newBus3) {
                        if (err) console.log(err);
                        busModel.findBusById(newBus1._id, function (err, targetBus) {
                            expect(targetBus.placa).toBe("dzl-96e");
                            expect(targetBus.nSerie).toBe(123);
                            done();
                        });
                    });
                });
            });
        });
    });
    

    describe("bus.createInstance", () => {
        it("crear una instancia de bus", (done) => {
            let bus = busModel.createInstance("dzl-96e",123);
            expect(bus.placa).toBe("dzl-96e");
            expect(bus.nSerie).toBe(123);
            done();
        });
    });
    describe("bus.add", () => {
        it("guarda una instancia de bus en db", (done) => {
            let bus = busModel.createInstance("dzl-96e",123);
            busModel.add(bus, function(err, newbus){
                if (err) console.log(err);

                expect(newbus.placa).toBe("dzl-96e");
                expect(newbus.nSerie).toBe(123);
                done();
            });
        });
    });
    describe('bus.removeById ', function () {
        it("no debe estar el bus con id 1", (done) => {
            let bus1 = busModel.createInstance("dzl-96e",123);

            busModel.add(bus1, function (err, newBus1) {
                if (err) console.log(err);
                let bus2 = busModel.createInstance("qwe-a6e",321);

                busModel.add(bus2, function (err, newBus2) {
                    if (err) console.log(err);
                    let bus3 = busModel.createInstance("zxc-464",159);

                    busModel.add(bus3, function (err, newBus3) {
                        if (err) console.log(err);
                        busModel.removeByID(newBus1._id, function (err, doc) {
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
