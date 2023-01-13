import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../config/firebase";
import { doc, collection } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const useGetGames = () => {
    return useCollection(
        collection(db, 'games'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
};

const useGetGameInfo = (gameId) => {
    return useDocument(
        doc(db, `games/${gameId}`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
};

export {
    useGetGames,
    useGetGameInfo
}