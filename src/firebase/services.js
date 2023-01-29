import firebase, { db } from "./config"

export const addDocument = (collection, data) => {
    const query = db.collection(collection);

    query.add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};


export const generateWords = (displayName) => {
    // tach ra thanh mang
    const name = displayName.split(" ");

    const length = name.length;
    let flagArr = []
    let result = []
    for (let i = 0; i < length; i++) {
        flagArr.push(false);
    }


    // tách chữ 
    let keywordsArr = []
    const createKeywords = (name) => {
        let rs = '';
        let keywordsArrMem = [];
        for (let i = 0; i < name.length; i++) {
            rs += name[i];
            keywordsArrMem.push(rs);
        }
        return keywordsArrMem;
    }


    // backtracking
    let stringArr = []
    const permutationText = (index) => {
        for (let i = 0; i < length; i++) {
            if (!flagArr[i]) {
                flagArr[i] = true;
                result[index] = name[i]
                if (index === length - 1) {
                    stringArr.push(result.join(' '))
                } else {
                    permutationText(index + 1)
                }
                flagArr[i] = false;
            }
        }
    }
    permutationText(0)
    console.log({ stringArr })


    const keywords = stringArr.reduce((acc, cur) => {
        const words = createKeywords(cur);
        console.log(words);
        return [...acc, ...words]
    }, [])
    return keywords;
}