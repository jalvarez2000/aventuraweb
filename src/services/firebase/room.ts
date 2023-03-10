import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../config/firebase";


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