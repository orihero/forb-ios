import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import RoundInput from "../components/RoundInput";
import RoundButton from "../components/RoundButton";
import Colors from "../constants/Colors";
import api from "../api/api";
import strings from "../localization/Strings";

class VerifyPhone extends Component {
	state = { status: "idle", code: "", errors: {} };
	verify = () => {
		let user_id = this.props.navigation.getParam("user_id");
		let register = this.props.navigation.getParam("register");
		this.setState({ ...this.state, status: "rotate" });
		api.auth
			.sendCode({ phone_code: this.state.code, user_id })
			.then(res => {
				if (res.status === 200) {
					register(res.data.data);
					this.props.navigation.navigate("Main");
				} else {
					this.setState({
						...this.state,
						errors: { code: res.data.message },
						status: "idle"
					});
				}
			});
	};
	render() {
		let { status, code } = this.state;
		return (
			<View
				style={{
					flex: 1,
					padding: 15,
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<Text
					style={{
						fontSize: 18,
						color: Colors.black,
						textAlign: "center"
					}}
				>
					{strings.weSentMessage}
				</Text>
				<RoundInput
					onTextChange={(key, val) =>
						this.setState({ ...this.setState, [key]: val })
					}
					placeholder={strings.confirmationCode}
					name="code"
					textContentType="oneTimeCode"
					keyboardType="numeric"
					error={this.state.errors}
				/>
				<RoundButton
					status={this.state.status}
					onPress={this.verify}
					big
					animated
					fill
					color={Colors.blue}
					text={strings.confirm}
					disabledIcon={() => (
						<Icon
							name="right-arrow"
							color={Colors.pink}
							size={18}
						/>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default VerifyPhone;
