import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../config/firebase";
import { doc } from "firebase/firestore";


const useGetPlayerInfo = (gameId, playerId) => {
    return useDocument(
        doc(db, `games/${gameId}/players`, playerId),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
};



export {
    useGetPlayerInfo
}