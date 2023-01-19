import { db, type PlayCard } from "$lib/db";
import { log } from "$lib/logs";

export const createPlayCard = async (playCard: PlayCard) => {
    log('api/play-cards createPlayCard', false, { playCard });

    try {
        return await db.customPlayCards.add(playCard);
    } catch (error) {
        console.error('error creating play card', { playCard, error });
        return -1;
    }
}