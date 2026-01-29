import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
  Linking,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UploadFileModal from "./subscribedcomp/UploadFileModal";


if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function ExpandableCard({
  header,
  subHeader,
  badgeText,
  amount,
  rows = [],
  preOrderFormPath,
  onDelete,
  onInfo,
  invoiceURL,
}) {
  const [open, setOpen] = useState(false);

  // ✅ hooks INSIDE component
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  const handleDownload = async () => {
    if (!preOrderFormPath) return;
    Linking.openURL(preOrderFormPath);
  };

  function Row({ label, value }) {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value ?? "-"}</Text>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity activeOpacity={0.9} onPress={toggle}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.left}>
              <Text style={styles.title}>{header}</Text>
              {subHeader && <Text style={styles.sub}>{subHeader}</Text>}
            </View>

            <View style={styles.right}>
              {amount && <Text style={styles.amount}>{amount}</Text>}
              {badgeText && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badgeText}</Text>
                </View>
              )}
            </View>
          </View>

          {/* DETAILS */}
          {open && (
            <View style={styles.details}>
              {rows.map((row, index) => (
                <Row key={index} {...row} />
              ))}

              {/* ACTIONS */}
              <View style={styles.actions}>
                {/* UPLOAD */}
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => setShowUploadModal(true)}
                >
                  <Text style={styles.actionText}>Upload</Text>
                </TouchableOpacity>

                {/* DOWNLOAD */}
                {uploadedFile && (
                  <TouchableOpacity
                    style={styles.downloadBtn}
                    onPress={() => Linking.openURL(uploadedFile.uri)}
                  >
                    <Text style={styles.actionText}>Download</Text>
                  </TouchableOpacity>
                )}
              </View>

              {invoiceURL && (
                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => Linking.openURL(invoiceURL)}
                >
                  <Ionicons name="download-outline" size={18} color="#fff" />
                  <Text style={styles.downloadText}>Download Invoice</Text>
                </TouchableOpacity>
              )}

              {/* FILE NAME */}
              {uploadedFile && (
                <Text style={styles.fileName}>📄 {uploadedFile.name}</Text>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* ✅ MODAL OUTSIDE CARD */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowUploadModal(false)}
      >
        <UploadFileModal
          onClose={() => setShowUploadModal(false)}
          onFileSelected={setUploadedFile}
        />
      </Modal>
    </>
  );
}



const styles = StyleSheet.create({
  card: {
    marginTop : 20,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    padding: 16,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  right: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50",
  },
  sub: {
    marginTop: 4,
    fontSize: 13,
    color: "#7f8c8d",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#d35400",
  },
  badge: {
    marginTop: 6,
    backgroundColor: "#fff3cd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    color: "#856404",
    fontWeight: "700",
  },
  details: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#95a5a6",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#34495e",
  },
  actions: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 16,
},

downloadBtn: {
  backgroundColor: "#2563EB",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 10,
},

actionText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 13,
},

deleteBtn: {
  backgroundColor: "#FEE2E2",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 10,
},

deleteText: {
  color: "#B91C1C",
  fontWeight: "600",
  fontSize: 13,
},
uploadBtn: {
  backgroundColor: "#16A34A",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 10,
},

fileName: {
  marginTop: 10,
  fontSize: 12,
  color: "#475569",
},
downloadBtn: {
    marginTop: 12,
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  downloadText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },
});
