import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ChatBubble } from '@/components/ChatBubble';
import { Avatar } from '@/components/Avatar';
import { chatRules, assistantFallback, suggestedQuestions } from '@/data/mockData';
import { ChatMessage } from '@/types';
import { Send, Bot } from 'lucide-react-native';

// UNIZIK Assistant — a keyword-matching chatbot.
// The assistant scans the user's message for known keywords and returns
// the first matching rule's response, or a fallback if nothing matches.

let messageCounter = 0;
function makeId() {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

// Find a response by checking if ALL keywords in a rule appear in the message.
function getResponse(userText: string): string {
  const lower = userText.toLowerCase();
  for (const rule of chatRules) {
    // A rule matches if every keyword is found in the message.
    if (rule.keywords.every((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return assistantFallback;
}

export default function AssistantScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: makeId(),
      sender: 'assistant',
      text: "Hello! I'm the UNIZIK Connect Assistant. Ask me about university offices, clearance, transcripts, ID cards, library hours, and more.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to the bottom whenever a new message or typing indicator appears.
  useEffect(() => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add the user's message immediately.
    const userMessage: ChatMessage = {
      id: makeId(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate a "thinking" delay, then respond.
    setTimeout(() => {
      const response = getResponse(text);
      const assistantMessage: ChatMessage = {
        id: makeId(),
        sender: 'assistant',
        text: response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAvatar}>
          <Bot size={24} color={Colors.white} strokeWidth={2} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>UNIZIK Assistant</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Chat messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.flex}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <View style={styles.typingRow}>
              <View style={styles.typingBubble}>
                <View style={[styles.typingDot, styles.typingDot1]} />
                <View style={[styles.typingDot, styles.typingDot2]} />
                <View style={[styles.typingDot, styles.typingDot3]} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggested questions */}
        {messages.length <= 1 && (
          <View style={styles.suggestionsWrap}>
            <Text style={styles.suggestionsTitle}>Suggested questions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.suggestionsRow}>
                {suggestedQuestions.map((q) => (
                  <TouchableOpacity
                    key={q}
                    style={styles.suggestionChip}
                    onPress={() => sendMessage(q)}
                  >
                    <Text style={styles.suggestionText}>{q}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            placeholderTextColor={Colors.textMuted}
            multiline
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
          >
            <Send size={20} color={Colors.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.open,
  },
  statusText: {
    fontSize: 12,
    color: Colors.open,
    fontWeight: Typography.medium,
  },
  chatContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  typingRow: {
    flexDirection: 'row',
    marginVertical: Spacing.xs,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    borderBottomLeftRadius: Radius.sm,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textMuted,
  },
  typingDot1: { opacity: 0.4 },
  typingDot2: { opacity: 0.7 },
  typingDot3: { opacity: 1 },
  suggestionsWrap: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: Typography.bold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  suggestionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  suggestionChip: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: Typography.medium,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 15,
    color: Colors.text,
    maxHeight: 80,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
