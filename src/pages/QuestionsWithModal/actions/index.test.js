const rewire = require("rewire")
const index = rewire("./index")
const create = index.__get__("create")
const update = index.__get__("update")
// @ponicode
describe("index.load", () => {
    test("0", () => {
        let callFunction = () => {
            index.load(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.load("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.load(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            index.load("da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            index.load("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.load(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.addOrUpdate", () => {
    test("0", async () => {
        await index.addOrUpdate(() => "bc23a9d531064583ace8f67dad60f6bb", { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", active: false })
    })

    test("1", async () => {
        await index.addOrUpdate(() => "bc23a9d531064583ace8f67dad60f6bb", { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", active: false })
    })

    test("2", async () => {
        await index.addOrUpdate(() => "c466a48309794261b64a4f02cfcc3d64", { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", active: true })
    })

    test("3", async () => {
        await index.addOrUpdate(() => "c466a48309794261b64a4f02cfcc3d64", { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", active: false })
    })

    test("4", async () => {
        await index.addOrUpdate(() => 12345, { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", active: false })
    })

    test("5", async () => {
        await index.addOrUpdate(undefined, undefined)
    })
})

// @ponicode
describe("create", () => {
    test("0", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["foo bar", -0.353, "**text**", 4653]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        await create(9876, param2)
    })

    test("1", async () => {
        let object = [[10, -45.9, 103.5, 0.955674], ["elio@example.com", "Elio", "Dillenberg"], ["foo bar", -0.353, "**text**", 4653]]
        let object2 = [[10, -45.9, 103.5, 0.955674], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        await create(12345, param2)
    })

    test("2", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], [-1, 0.5, 1, 2, 3, 4, 5]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], [10, -45.9, 103.5, 0.955674]]
        let param2 = [object, object2, object3]
        await create("c466a48309794261b64a4f02cfcc3d64", param2)
    })

    test("3", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [[10, -45.9, 103.5, 0.955674], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        await create("bc23a9d531064583ace8f67dad60f6bb", param2)
    })

    test("4", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["a", "b", "043", "foo bar"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["foo bar", -0.353, "**text**", 4653], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        await create(12345, param2)
    })

    test("5", async () => {
        await create(undefined, undefined)
    })
})

// @ponicode
describe("update", () => {
    test("0", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["a", "b", "043", "foo bar"], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        await update("da7588892", param2)
    })

    test("1", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], [-1, 0.5, 1, 2, 3, 4, 5]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], [-1, 0.5, 1, 2, 3, 4, 5], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        await update("c466a48309794261b64a4f02cfcc3d64", param2)
    })

    test("2", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["foo bar", -0.353, "**text**", 4653]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], [10, -45.9, 103.5, 0.955674]]
        let param2 = [object, object2, object3]
        await update(12345, param2)
    })

    test("3", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], [10, -45.9, 103.5, 0.955674]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], [-1, 0.5, 1, 2, 3, 4, 5], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        await update("da7588892", param2)
    })

    test("4", async () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [[10, -45.9, 103.5, 0.955674], [-1, 0.5, 1, 2, 3, 4, 5], ["foo bar", -0.353, "**text**", 4653]]
        let param2 = [object, object2, object3]
        await update(12345, param2)
    })

    test("5", async () => {
        await update(undefined, undefined)
    })
})

// @ponicode
describe("index.destroy", () => {
    test("0", () => {
        let callFunction = () => {
            index.destroy(() => 12345, { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.destroy(() => "da7588892", { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.destroy(() => "bc23a9d531064583ace8f67dad60f6bb", { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            index.destroy(() => "da7588892", { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            index.destroy(() => "c466a48309794261b64a4f02cfcc3d64", { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.destroy(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
