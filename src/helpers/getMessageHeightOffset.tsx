// is function ki madat say pta chalay ga kay jo ap ka input box hay us ki height kitni hay.

const getMessageHeightOffset = (heightOfMessageBox, windowHeight) => {
    const maxHeightOfMessageBox = windowHeight * 0.18;
    if (heightOfMessageBox>maxHeightOfMessageBox) {
        return maxHeightOfMessageBox - windowHeight * 0.05
    }
    if (heightOfMessageBox > 24) {
        return heightOfMessageBox - windowHeight * 0.035
    }
    return 0;
}

export default getMessageHeightOffset;