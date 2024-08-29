import type { StyledProps } from 'nativewind';
import { styled } from 'nativewind';
import { Modal, StyleSheet, type ModalProps } from 'react-native';
import { type FC, type ReactNode } from 'react';
import { SView } from './SView';
import { SButton } from './SButton';
import { Entypo } from '@expo/vector-icons';

const StyledModel = styled(Modal);

type Props = StyledProps<ModalProps> & {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  children: ReactNode;
  isDisabled?: boolean;
};

export const SModel: FC<Props> = ({
  setModalVisible,
  children,
  isDisabled,
  ...props
}) => {
  return (
    <>
      <StyledModel
        {...props}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent={true}
      >
        <SView style={styles.centeredView}>
          <SView
            className="bg-white rounded-2xl px-4 py-2 mx-5 relative self-stretch"
            style={styles.modalView}
          >
            <SButton
              className="absolute right-3 top-2"
              onPress={() => setModalVisible(false)}
              variant="text"
              disabled={isDisabled}
            >
              <Entypo name="cross" size={26} />
            </SButton>
            {children}
          </SView>
        </SView>
      </StyledModel>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
});
