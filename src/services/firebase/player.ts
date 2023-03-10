import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const useGetGamePlayerInfo = (gameId: string, playerId: string | undefined) => {
    return useDocument(
        doc(db, `games/${gameId}/players/${playerId}`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
};

export {
    useGetGamePlayerInfo as useGetGamePlayerInfo
}