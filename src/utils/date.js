export const dateToString = (date) => {

   
    const formattedTime = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit', minute: '2-digit'
    }).format(date);

    return formattedTime;

}
