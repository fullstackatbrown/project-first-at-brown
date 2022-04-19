import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Options should come as array of {label: _, value: _}
const Select = React.forwardRef(
  ({ options, onSelect, value, style, label }, ref) => {
    const [focused, setFocused] = useState(false);
    const [reverseIndex] = useState(
      options.reduce(
        (prev, curr) => ({ ...prev, [curr.value]: curr.label }),
        {}
      )
    );

    useImperativeHandle(ref, () => ({
      blur: () => {
        setFocused(false);
      },
    }));

    return (
      <View style={{ ...style, zIndex: 10 }}>
        <Text style={styles.prompt}>{label}</Text>
        <TouchableOpacity
          style={{
            ...styles.input,
            borderColor: focused ? '#4F19A8' : '#F5F3F7',
          }}
          onPress={() => setFocused(!focused)}
        >
          <Text style={styles.inputText}>{reverseIndex[value]}</Text>
        </TouchableOpacity>
        {focused && (
          <View
            style={{
              ...styles.selections,
              ...styles.shadow,
            }}
          >
            {options.map((option, index) => {
              return (
                <View key={option.value}>
                  {index !== 0 && <View style={styles.divider} />}
                  <TouchableOpacity
                    onPressIn={() => {
                      onSelect(option.value);
                      setFocused(false);
                    }}
                    style={styles.selection}
                  >
                    <Text style={{ fontSize: 16 }}>{option.label}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  }
);

export default Select;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: '#F5F3F7',
    padding: 16,
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
  },
  prompt: { fontSize: 16, marginBottom: 18 },
  shadow: {
    shadowOffset: { height: 4 },
    shadowRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  selections: {
    position: 'absolute',
    top: 100,
    width: '100%',
    borderRadius: 10,
    borderColor: '#A28DCE',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  selection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  divider: {
    borderBottomWidth: 1,
    marginHorizontal: 18,
    borderColor: '#B1B1B1',
  },
});
