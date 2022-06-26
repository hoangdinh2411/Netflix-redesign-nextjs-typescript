const firebaseErrorHandling = (error:string)=>{

    switch (error) {
        case 'auth/email-already-exists':
            return 'The email already exists'
        case 'auth/user-not-found':
            return 'The email does not exists'
        case 'auth/invalid-password':
            return 'The password was incorrect'
    
        default:
            return 'Something was wrong . Please try again later!';
    }
} 

export default firebaseErrorHandling