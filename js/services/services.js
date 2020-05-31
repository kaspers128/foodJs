//async, await используется для "преобразования" синхронного скрипта в асинхронный
//перед тем местом где нужно дождаться ответа ставим await
//в данном примере если не поставить await перед fetch, то в переменную res может записаться undefined, 
//так как fetch еще не успел выполниться
const postData = async (url, data) => {
    const res = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: data,
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export{postData};
//export{getResource};