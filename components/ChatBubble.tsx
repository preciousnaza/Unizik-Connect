import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ChatMessage } from '@/types';

// ChatBubble renders a single message in the assistant chat.
// User messages align right (blue); assistant messages align left (light).

type Props = {
  message: ChatMessage;
};

export function ChatBubble({ message }: Props) {
  const isUser = message.sender === 'user';

  return (
    <View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowAssistant,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAssistant,
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser ? styles.textUser : styles.textAssistant,
          ]}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: Spacing.xs,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAssistant: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: Radius.sm,
  },
  bubbleAssistant: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: Radius.sm,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
  },
  textUser: {
    color: Colors.white,
    fontWeight: Typography.medium,
  },
  textAssistant: {
    color: Colors.text,
  },
});
