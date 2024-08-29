import { StyleSheet } from 'react-native';
import React from 'react';
import { SView } from '~base';
import { Loader } from '~base';

export const PreSplash = () => {
  return (
    <SView style={styles.container}>
      <Loader height={100} width={100} />
    </SView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
