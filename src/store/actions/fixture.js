import { SET_FIXTURE, SET_EXPECTATIONS, UPDATE_EXPECTATION } from "./actionTypes";
import { loadingData, loadingDataCompleted } from "./ui";
import { authGetToken } from "./auth";

export const setFixture = (fixture) => {
	return {
		type: SET_FIXTURE,
		fixture: fixture,
	}
};

export const setExpectations = (expectations) => {
	return {
		type: SET_EXPECTATIONS,
		expectations: expectations,
	}
};

export const updateExpectation = (group, match, expectation) => {
	return {
		type: UPDATE_EXPECTATION,
		group: group,
		match: match,
		expectation: expectation,
	}
};

export const loadData = () => {
	return (dispatch, getState) => {
		let authToken = null;
		const userId = getState().auth.userId;
		dispatch(loadingData());
		dispatch(authGetToken())
			.then(token => {
				authToken = token;
				return fetch("https://react-native-penca.firebaseio.com/expectations/" + userId + ".json?auth=" + authToken)
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error();
				}
			})
			.then(parsedRes => {
				const expectations = parsedRes || {
					a: {
						matches: [
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
						]
					},
					b: {
						matches: [
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
						]
					},
					c: {
						matches: [
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
						]
					},
					d: {
						matches: [
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
						]
					},
					e: {
						matches: [
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
						]
					},
					f: {
						matches: [
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
						]
					},
					g: {
						matches: [
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
						]
					},
					h: {
						matches: [
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
							{
								home_expected_result: 0,
								away_expected_result: 0,
							},
						]
					},
				};
				dispatch(setExpectations(expectations));
				return fetch("https://react-native-penca.firebaseio.com/fixture.json?auth=" + authToken)
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error();
				}
			})
			.then(parsedRes => {
				for (let groupKey in parsedRes.groups) {
					for (let match of parsedRes.groups[groupKey].matches) {
						match.home_team = parsedRes.teams[match.home_team - 1];
						match.away_team = parsedRes.teams[match.away_team - 1];
					}
				}
				dispatch(setFixture(parsedRes.groups));
				dispatch(loadingDataCompleted());
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong, please try again!");
				dispatch(loadingDataCompleted());
			})
	};
};

export const submitExpectations = () => {
	return (dispatch, getState) => {
		let authToken;
		let userId;

		dispatch(loadingData());
		dispatch(authGetToken())
			.then(token => {
				authToken = token;
				userId = getState().auth.userId;
				return fetch("https://react-native-penca.firebaseio.com/expectations/" + userId + ".json?auth=" + authToken, {
					method: "PUT",
					body: JSON.stringify(getState().fixture.expectations)
				})
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error();
				}
			})
			.then(() => {
				dispatch(loadingDataCompleted());
				alert("Expectations received");
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong, please try again!");
			})

	};
};