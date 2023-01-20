import { db, type PlayCard } from "$lib/db";
import { error, log } from "$lib/logs";

export const createPlayCard = async (playCard: PlayCard) => {
    log('api/play-cards createPlayCard', false, { playCard });

    try {
        return await db.customPlayCards.add(playCard);
    } catch (err) {
        error('error creating play card', false, { playCard, err });
        return -1;
    }
}

export const deletePlayCard = async (id: number) => {
    log('api/play-cards createPlayCard', false, { id });

    try {
        await db.customPlayCards.delete(id);
    } catch (err) {
        error('error creating play card', false, { id, err });
    }
}