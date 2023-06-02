import { useRef } from 'react';
import styles from './app.module.css';
import { useForm } from 'react-hook-form';


const sendData = (formData) => {
	console.log(formData);
};

function App() {
	const submitButtonRef = useRef();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
    });

    const emailProps = {
        minLength: { value: 3, message: 'Неверный логин. Должно быть не меньше 3 символов' },
        maxLength: { value: 20, message: 'Неверный логин. Должно быть не больше 20 символов' },
        pattern: {
            value: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
        },
    };
    const passwordProps = {
        minLength: { value: 3, message: 'Неверный логин. Должно быть не меньше 3 символов' },
        maxLength: { value: 20, message: 'Неверный логин. Должно быть не больше 20 символов' },
        pattern: {
            value: /^[\w_]*$/,
            message: 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
        },
    };
    const repeatPasswordProps = {
        minLength: { value: 3, message: 'Неверный логин. Должно быть не меньше 3 символов' },
        maxLength: { value: 20, message: 'Неверный логин. Должно быть не больше 20 символов' },
        pattern: {
            value: /^[\w_]*$/,
            message: 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
        },
    };


	// useEffect(() => {
	// 	if (repeatPassword === '') {
	// 		setRepeatPasswordError('Поле не может быть пустым');
	// 	} else if (repeatPassword !== password){
	// 		setRepeatPasswordError('Пароли не cовпадает');
	// 	} else {
	// 		setRepeatPasswordError('');
	// 	}
	// }, [repeatPassword, password]);

	// useEffect(() => {
	// 	if (emailError || passwordError || repeatPasswordError) {
	// 		setFormValid(false);
	// 	} else {
	// 		setFormValid(true);
	// 		setTimeout(() => {
	// 			submitButtonRef.current.focus();
	// 		}, 0);
	// 	}
	// }, [emailError, passwordError, repeatPasswordError]);

	// const onEmailChange = ({ target }) => {
	// 	setEmail(target.value);
	// 	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)) {
	// 		setEmailErrorr('Некорректный формат email-адреса');
	// 	} else {
	// 		setEmailErrorr('');
	// 	}
	// };

	// const onPasswordChange = ({ target }) => {
	// 	setPassword(target.value);
	// 	if (target.value.length < 3 || target.value.length < 8) {
	// 		setPasswordError('Пароль должен быть длиной от 3 и не меньше 8 символов');
	// 	} else if (!/^(?=.*[A-Z])[a-zA-Z0-9]+$/.test(target.value)) {
	// 		setPasswordError(
	// 			'Пароль должен содержать хотя бы одну заглавную букву и не использовать кирилицу',
	// 		);
	// 	} else {
	// 		setPasswordError('');
	// 	}
	// };

	// const onRepeatPasswordChange = ({ target }) => {
	// 	setRepeatPassword(target.value);
	// };

	// const blurHandler = ({ target }) => {
	// 	if (target.name === 'email') {
	// 		setEmailBlur(true);
	// 	} else if (target.name === 'password') {
	// 		setPasswordBlur(true);
	// 	} else if (target.name === 'repeat-password') {
	// 		setRepeatPasswordBlur(true);
	// 	}
	// };

	// const onSubmit = (event) => {
	// 	event.preventDefault();
	// 	sendData({ email, password });
	// };
	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	return (
		<div className={styles.App}>
			<form className={styles.registrForm} onSubmit={handleSubmit(sendData)}>
				<h2>Регистрация</h2>
				<div className={styles.form_group}>
					<label className={styles.name}>Email:</label>
					<input
						type="email"
						name="email"
						placeholder="Почта"
						{...register('email', emailProps)}
						// onBlur={blurHandler}
					/>
					{emailError && (
						<div className={styles.errorLabel}>{emailError}</div>
					)}
				</div>

				<div className={styles.form_group}>
					<label className={styles.name}>Password:</label>
					<input
						type="password"
						name="password"
						placeholder="Пароль"
						{...register('password', passwordProps)}
						// onBlur={blurHandler}
					/>
					{passwordError && (
						<div className={styles.errorLabel}>{passwordError}</div>
					)}
				</div>

				<div className={styles.form_group}>
					<label className={styles.name}>Repeat password:</label>
					<input
						type="password"
						name="repeat-password"
						placeholder="Повтор пароля"
						{...register('repeatPassword', repeatPasswordProps)}
						// onBlur={blurHandler}
					/>
					{repeatPasswordError && (
						<div className={styles.errorLabel}>{repeatPasswordError}</div>
					)}
				</div>
				<button ref={submitButtonRef} type="submit" >
					Зарегистрироваться
				</button>
				{/* disabled={!formValid} */}
			</form>
		</div>
	);
}

export default App;
