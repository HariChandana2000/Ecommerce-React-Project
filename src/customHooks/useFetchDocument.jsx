import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const useFetchDocument = (collectionName, documentId) => {
  const [document, setDocument] = useState(null);

  const getDocument = async () => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDocument({ id: documentId, ...docSnap.data() });
    } else {
      toast.error("Document not found");
    }
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { document };
};

export default useFetchDocument;
