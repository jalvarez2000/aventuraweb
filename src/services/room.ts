import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../config/firebase";
import { doc } from "firebase/firestore";


const useGetRoomInfo = (roomId: string) => {
    return useDocument(
        doc(db, "games/6VgFHH0eftew5fVtqPQx/rooms", roomId),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
};



export {
    useGetRoomInfo
}