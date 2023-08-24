import { db } from "./firebase";

import { faker } from '@faker-js/faker';

async function main() {
    for (let i = 0; i < 5; i++) {
        const docRef = await db.collection("todos").add({
            title: faker.word.noun(),
            status: "pending",
            created_at: (new Date).toISOString(),
        });
        docRef.collection("subtasks").add({
            title: faker.word.verb(),
            status: "pending",
            created_at: (new Date).toISOString(),
        })
    }
}

main();