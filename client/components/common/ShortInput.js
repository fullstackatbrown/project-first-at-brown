import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const ShortInput = ({ label, value, onChange, style, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={style}>
      <Text style={styles.prompt}>{label}</Text>
      <TextInput
        {...props}
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

export default ShortInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: '#F5F3F7',
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
  },
  prompt: { fontSize: 16, marginBottom: 18 },
});
