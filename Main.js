/* eslint-disable require-jsdoc */
import React from 'react';
import { StyleSheet, View, Alert, Button } from 'react-native';

function Seperator() {
    return <View style={styles.seperator} />;
}
export default class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Button style={styles.title}
                        title='SSUFUN'
                        onPress={() => Alert.alert('홈으로 이동')}
                    />
                    <Button style={styles.login}
                        title='회원가입 / 로그인'
                        onPress={() => Alert.alert('회원가입 / 로그인')}
                    />
                </View>
                <View style={styles.list}>
                    <Button
                        title='식당'
                        onPress={() => Alert.alert('식당으로 이동')}
                    />

                    <Button
                        title='공지사항'
                        onPress={() => Alert.alert('공지사항으로 이동')}
                    />

                    <Button
                        title='팀'
                        onPress={() => Alert.alert('팀으로 이동')}
                    />
                </View>
                <View style={styles.banner}>
                    <Button
                        title='배너 1'
                        onPress={() => Alert.alert('배너 1으로 이동')}
                    />
                    <Seperator />
                    <Button
                        title='배너 2'
                        onPress={() => Alert.alert('배너 2으로 이동')}
                    />
                    <Seperator />
                    <Button
                        title='배너 3'
                        onPress={() => Alert.alert('배너 3으로 이동')}
                    />
                    <Seperator />
                    <Button
                        title='배너 4'
                        onPress={() => Alert.alert('배너 4으로 이동')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
    },
    row: {
        margin: 3,
        flex: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        padding: 5,
        backgroundColor: 'skyblue',
    },
    login: {
        padding: 5,
        backgroundColor: 'green',
        textAlign: 'right',
    },
    list: {
        flex: 5,
        backgroundColor: '#cccccc',
        padding: 3,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    banner: {
        flex: 40,
        padding: 5,
    },
    seperator: {
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        padding: 5,
    },
});

export default Main;