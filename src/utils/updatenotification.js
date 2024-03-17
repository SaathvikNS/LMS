export const updateNotification = (updater, text, type=false) => {
    try {
        
        updater({text, type});
    } catch (error) {
        console.log(error)
    }
    setTimeout(() => {
        updater({text: '', type: ''});
    }, 3000);
}