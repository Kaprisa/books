export const wrap = async f => {
    try {
        await f()
        return {
            visible: true,
            text: 'Успех!',
            error: false
        }
    } catch (e) {
        console.log(e)
        return {
            visible: true,
            text: e.message ? e.message : 'Ошибка сервера',
            error: true
        }
    }
}
