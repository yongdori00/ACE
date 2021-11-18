/* eslint-disable require-jsdoc */
import React from 'react';
import { StyleSheet, View, Alert, Button, ScrollView, Dimensions, } from 'react-native';

function Seperator() {
    return <View style={styles.seperator} />;
}
export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity>
                        <Text style={styles.logo}
                            onPress={() => Alert.alert('홈으로 이동')}
                        >
                            SSUFUN
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.login}
                            onPress={() => Alert.alert('회원가입 / 로그인')}
                        >
                            회원가입 / 로그인
                        </Text>
                    </TouchableOpacity>
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
                <ScrollView style={styles.banner}>
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
                </ScrollView>
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
        height: Dimensions.get('window').height / 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        alignItems: 'center',
        padding: 5,
    },
    login: {
        padding: 5,
        textAlign: 'right',
    },
    list: {
        height: Dimensions.get('window').height / 13,
        backgroundColor: '#cccccc',
        padding: 3,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    banner: {
        padding: 5,
    },
    seperator: {
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        padding: 5,
    },
});