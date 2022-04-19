import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const MultilineInput = ({ label, value, onChange, style }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={style}>
      <Text style={styles.prompt}>{label}</Text>
      <TextInput
        multiline
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={onChange}
        value={value}
        style={{
          ...styles.input,
          borderColor: focused ? '#4F19A8' : '#F5F3F7',
        }}
      />
    </View>
  );
};

export default MultilineInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: '#F5F3F7',
    fontSize: 16,
    padding: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderWidth: 1,
    height: 160,
  },
  prompt: { fontSize: 16, marginBottom: 18 },
});
