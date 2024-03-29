import React from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	Image,
	Text,
	SafeAreaView,
	ScrollView
} from "react-native";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import LoginBackground from "../assets/images/Login.png";
import Logo from "../assets/images/logo.png";
import RoundInput from "../components/RoundInput";
import RoundButton from "../components/RoundButton";
import { CheckBox } from "react-native-elements";
import Icon from "../services/IconService";
import Feather from "react-native-vector-icons/Feather";
import { loginAsync } from "../actions/thunk";
import { connect } from "react-redux";
import NavigationService from "../services/NavigationService";
import StorageService from "../services/StorageService";
import strings from "../localization/Strings";

class Login extends React.Component {
	state = {
		phone: "",
		password: "",
		status: "idle",
		error: "",
		remember: true
	};
	login = () => {
		let { phone, password } = this.state;
		console.warn(phone);
		console.warn(password);
		if (phone === "" || password === "") {
			this.setState({
				...this.state,
				error: { phone: strings.fill }
			});
			return;
		}
		this.setState({ ...this.state, status: "rotate" });
		this.props.dispatch(
			loginAsync({ phone, password }, res => {
				if (res.status === 200) {
					NavigationService.navigate("Main");
					setTimeout(
						() => this.setState({ ...this.state, status: "idle" }),
						200
					);
				} else {
					this.setState({
						...this.state,
						error: res.response.data.errors,
						status: "idle"
					});
				}
			})
		);
	};
	render() {
		let { navigation } = this.props;
		let { error } = this.state;
		return (
			<ImageBackground style={styles.container} source={LoginBackground}>
				<ScrollView style={{ paddingTop: 30 }}>
					<View>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Image
								source={Logo}
								style={{ width: 120, height: 120 }}
							/>
							<RoundInput
								transparent
								onTextChange={(key, val) => {
									this.setState({
										...this.state,
										[key]: val,
										error: ""
									});
								}}
								leftIcon={() => (
									<Icon
										name="phone-1"
										size={16}
										color={Colors.white}
									/>
								)}
								textContentType="telephoneNumber"
								placeholder="998 ** *** ** **"
								rightIcon={() => (
									<Feather
										name="x"
										size={18}
										color={Colors.white}
									/>
								)}
								successIcon={() => (
									<Feather
										name="check"
										color={Colors.white}
									/>
								)}
								name="phone"
								keyboardType="phone-pad"
							/>
							<RoundInput
								name="password"
								transparent
								onTextChange={(key, val) =>
									this.setState({
										...this.state,
										[key]: val,
										error: ""
									})
								}
								password
								leftIcon={() => (
									<Icon
										name="lock"
										size={18}
										color={Colors.white}
									/>
								)}
								textContentType="password"
								placeholder="**********"
								rightIcon={() => (
									<Feather
										name="x"
										size={18}
										color={Colors.white}
									/>
								)}
								successIcon={() => (
									<Feather
										name="check"
										size={18}
										color={Colors.white}
									/>
								)}
							/>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									paddingTop: 15
								}}
							>
								<CheckBox
									checked={this.state.remember}
									containerStyle={{
										backgroundColor: "transparent",
										borderWidth: 0,
										padding: 0,
										margin: 0,
										justifyContent: "flex-start"
									}}
									checkedColor={Colors.pink}
									iconType="material-community"
									checkedIcon="circle-slice-8"
									title={strings.remember}
									unchackedColor={Colors.pink}
									uncheckedIcon={
										"checkbox-blank-circle-outline"
									}
									textStyle={{
										color: Colors.white,
										fontWeight: "400"
									}}
									onPress={() =>
										this.setState({
											...this.state,
											remember: !this.state.remember
										})
									}
								/>
								<View style={{ justifyContent: "center" }}>
									<Text
										style={{
											color: Colors.white,
											fontWeight: "bold"
										}}
									>
										{strings.forgot}
									</Text>
								</View>
							</View>
							<RoundButton
								status={this.state.status}
								fill
								text={strings.login}
								bold
								color={Colors.white}
								animated
								big
								onPress={this.login}
							/>
							{this.state.error !== "" && (
								<React.Fragment>
									<Text
										style={{
											color: Colors.pink,
											fontSize: 16,
											marginTop: 15
										}}
									>
										{this.state.error.phone}
									</Text>
									<Text
										style={{
											color: Colors.pink,
											fontSize: 16
										}}
									>
										{this.state.error.password}
									</Text>
								</React.Fragment>
							)}
						</View>
						<View
							style={{
								paddingBottom: 30,
								alignItems: "center"
							}}
						>
							<Text style={{ color: Colors.white }}>
								{strings.noAccount}
							</Text>
							<Text
								style={{
									textDecorationLine: "underline",
									fontWeight: "bold",
									lineHeight: 30,
									color: Colors.white
								}}
								onPress={() => {
									navigation.navigate("Register");
								}}
							>
								{strings.checkIn}
							</Text>
						</View>
						<View style={{ alignItems: "center" }}>
							<Text
								style={{
									textDecorationLine: "underline",
									fontWeight: "bold",
									lineHeight: 30,
									color: Colors.white
								}}
								onPress={() => {
									navigation.navigate("Main");
								}}
							>
								{strings.withoutRegistration}
							</Text>
						</View>
						<Text
							style={{
								padding: 15,
								fontWeight: "100",
								color: Colors.white,
								textAlign: "center",
								paddingBottom: 0
							}}
						>
							{strings.i}
						</Text>
						<Text
							style={{
								padding: 15,
								fontWeight: "100",
								paddingBottom: 30,
								color: Colors.pink,
								textAlign: "center",
								paddingTop: 0
							}}
						>
							{strings.agreement}
						</Text>
					</View>
				</ScrollView>
			</ImageBackground>
		);
	}
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightGray,
		justifyContent: "center",
		alignItems: "center"
	}
});
