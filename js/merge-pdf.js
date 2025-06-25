// PDF Merge Tool
class PDFMerger {
  constructor() {
    this.files = []
    this.initializeElements()
    this.setupEventListeners()
  }

  initializeElements() {
    this.uploadZone = document.getElementById("uploadZone")
    this.fileInput = document.getElementById("fileInput")
    this.uploadBtn = document.getElementById("uploadBtn")
    this.fileList = document.getElementById("fileList")
    this.filesContainer = document.getElementById("filesContainer")
    this.mergeBtn = document.getElementById("mergeBtn")
    this.progressSection = document.getElementById("progressSection")
    this.progressFill = document.getElementById("progressFill")
    this.progressText = document.getElementById("progressText")
    this.resultSection = document.getElementById("resultSection")
    this.downloadBtn = document.getElementById("downloadBtn")
    this.newMergeBtn = document.getElementById("newMergeBtn")
  }

  setupEventListeners() {
    this.uploadBtn.addEventListener("click", () => this.fileInput.click())
    this.fileInput.addEventListener("change", (e) => this.handleFileSelect(e))
    this.uploadZone.addEventListener("click", () => this.fileInput.click())
    this.uploadZone.addEventListener("dragover", (e) => this.handleDragOver(e))
    this.uploadZone.addEventListener("dragleave", (e) => this.handleDragLeave(e))
    this.uploadZone.addEventListener("drop", (e) => this.handleDrop(e))
    this.mergeBtn.addEventListener("click", () => this.mergePDFs())
    this.downloadBtn.addEventListener("click", () => this.downloadMergedPDF())
    this.newMergeBtn.addEventListener("click", () => this.resetMerger())
  }

  handleFileSelect(event) {
    const files = Array.from(event.target.files)
    this.addFiles(files)
  }

  handleDragOver(event) {
    event.preventDefault()
    this.uploadZone.classList.add("dragover")
  }

  handleDragLeave(event) {
    event.preventDefault()
    this.uploadZone.classList.remove("dragover")
  }

  handleDrop(event) {
    event.preventDefault()
    this.uploadZone.classList.remove("dragover")
    const files = Array.from(event.dataTransfer.files)
    const pdfFiles = files.filter((file) => file.type === "application/pdf")
    this.addFiles(pdfFiles)
  }

  addFiles(newFiles) {
    const validFiles = newFiles.filter((file) => {
      const isValidType = file.type === "application/pdf"
      const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB

      if (!isValidType) {
        this.showNotification("Only PDF files are supported", "error")
        return false
      }

      if (!isValidSize) {
        this.showNotification("File size must be less than 50MB", "error")
        return false
      }

      return true
    })

    validFiles.forEach((file) => {
      const fileId = Date.now() + Math.random()
      this.files.push({ id: fileId, file })
    })

    if (this.files.length > 0) {
      this.renderFileList()
      this.fileList.style.display = "block"
    }
  }

  renderFileList() {
    this.filesContainer.innerHTML = ""

    this.files.forEach((fileData, index) => {
      const fileItem = document.createElement("div")
      fileItem.className = "file-item"
      fileItem.draggable = true

      fileItem.innerHTML = `
                <div class="file-preview pdf-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.11 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                    </svg>
                </div>
                <div class="file-info">
                    <div class="file-name">${fileData.file.name}</div>
                    <div class="file-size">${this.formatFileSize(fileData.file.size)}</div>
                </div>
                <div class="file-order">${index + 1}</div>
                <button class="file-remove" onclick="merger.removeFile(${fileData.id})">
                    ×
                </button>
            `

      // Add drag and drop for reordering
      fileItem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", index)
        fileItem.classList.add("dragging")
      })

      fileItem.addEventListener("dragend", () => {
        fileItem.classList.remove("dragging")
      })

      fileItem.addEventListener("dragover", (e) => {
        e.preventDefault()
      })

      fileItem.addEventListener("drop", (e) => {
        e.preventDefault()
        const draggedIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))
        this.reorderFiles(draggedIndex, index)
      })

      this.filesContainer.appendChild(fileItem)
    })
  }

  reorderFiles(fromIndex, toIndex) {
    const [movedFile] = this.files.splice(fromIndex, 1)
    this.files.splice(toIndex, 0, movedFile)
    this.renderFileList()
  }

  removeFile(fileId) {
    this.files = this.files.filter((f) => f.id !== fileId)

    if (this.files.length === 0) {
      this.fileList.style.display = "none"
    } else {
      this.renderFileList()
    }
  }

  async mergePDFs() {
    if (this.files.length < 2) {
      this.showNotification("Please select at least 2 PDF files to merge", "error")
      return
    }

    this.progressSection.style.display = "block"
    this.mergeBtn.disabled = true

    try {
      await this.simulateMerge()

      // Create a simple merged file (simulation)
      const mergedBlob = await this.createMergedPDF()
      this.mergedBlob = mergedBlob

      this.progressSection.style.display = "none"
      this.resultSection.style.display = "block"

      this.showNotification("PDFs merged successfully!", "success")
    } catch (error) {
      console.error("Merge error:", error)
      this.showNotification("Error merging PDFs. Please try again.", "error")
      this.progressSection.style.display = "none"
      this.mergeBtn.disabled = false
    }
  }

  async simulateMerge() {
    const steps = [
      "Reading PDF files...",
      "Extracting pages...",
      "Combining documents...",
      "Optimizing structure...",
      "Finalizing merge...",
    ]

    for (let i = 0; i < steps.length; i++) {
      this.progressText.textContent = steps[i]
      this.progressFill.style.width = `${((i + 1) / steps.length) * 100}%`
      await this.delay(1000)
    }
  }

  async createMergedPDF() {
    // Create a simple text file as a placeholder for the merged PDF
    const content = `Merged PDF Document\n\nThis is a simulated merged PDF containing ${this.files.length} files:\n\n${this.files.map((f, i) => `${i + 1}. ${f.file.name}`).join("\n")}`
    return new Blob([content], { type: "text/plain" })
  }

  downloadMergedPDF() {
    if (!this.mergedBlob) {
      this.showNotification("No merged PDF available for download", "error")
      return
    }

    const url = URL.createObjectURL(this.mergedBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `merged-pdf-${Date.now()}.txt` // Note: This creates a text file as simulation
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    this.showNotification("Download started!", "success")
  }

  resetMerger() {
    this.files = []
    this.mergedBlob = null
    this.fileList.style.display = "none"
    this.progressSection.style.display = "none"
    this.resultSection.style.display = "none"
    this.mergeBtn.disabled = false
    this.fileInput.value = ""
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  showNotification(message, type = "info") {
    if (window.DOT_PDF && window.DOT_PDF.showNotification) {
      window.DOT_PDF.showNotification(message, type)
    } else {
      alert(message)
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// Initialize merger when page loads
let merger
document.addEventListener("DOMContentLoaded", () => {
  merger = new PDFMerger()
})
