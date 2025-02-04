export const OSGetGoodList = async () => {
    const requestBody = {
        ApiKey: '011ba11bdcad4fa396660c2ec447ef14',
        MethodName: 'OSGetGoodList'
    };

    try {
        const response = await fetch('https://sycret.ru/service/api/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.hasOwnProperty('result') || !data.hasOwnProperty('resultdescription') || !data.hasOwnProperty('data')) {
            throw new Error('Некорректный формат ответа от сервера');
        }

        if (data.result !== 0) {
            throw new Error(`Ошибка API: ${data['result description']}`);
        }
        return data.data; 
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export const OSSale = async ({
    id,
    tableName,
    primaryKey,
    price,
    summa,
    clientName,
    phone,
    email,
    paymentTypeId = 2,
    useDelivery = 0,
    isGift = 0,
    msgText = '',
    pName = '',
    pPhone = '',
    apiKey = "011ba11bdcad4fa396660c2ec447ef14",
}) => {
    const requestBody = {
        ApiKey: apiKey,
        MethodName: 'OSSale',
        Id: id,
        TableName: tableName,
        PrimaryKey: primaryKey,
        Price: price,
        Summa: summa,
        ClientName: clientName,
        Phone: phone,
        Email: email,
        PaymentTypeId: paymentTypeId,
        UseDelivery: useDelivery,
        IsGift: isGift,
        MsgText: msgText,
        PName: pName,
        PPhone: pPhone,
    };

    try {
        const response = await fetch('https://sycret.ru/service/api/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.hasOwnProperty('result') || !data.hasOwnProperty('resultdescription')) {
            throw new Error('Некорректный формат ответа от сервера');
        }

        if (data.result !== 0) {
            throw new Error(`Ошибка API: ${data['resultdescription']}`);
        }

        return data;
    } catch (error) {
        console.error('Ошибка при выполнении OSSale:', error);
        throw error;
    }
};
