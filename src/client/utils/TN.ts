const TN = (n: number) => {
    switch (n) {
        case 1:
            return 'borrowed'
            break
        case 2:
            return 'members'
            break
        case 3:
            return 'books'
            break
        default:
            return ''
            break
    }
}

export default TN
