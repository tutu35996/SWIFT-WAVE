// SW证书生成器 v2.0 - 主要JavaScript逻辑

class CertificateGenerator {
  constructor() {
    this.canvas = document.getElementById('certificateCanvas');
    this.ctx = this.canvas.getContext('2d');
    // 显示用的两个canvas
    this.canvasTop = document.getElementById('canvasTop');
    this.ctxTop = this.canvasTop.getContext('2d');
    this.canvasBottom = document.getElementById('canvasBottom');
    this.ctxBottom = this.canvasBottom.getContext('2d');
    this.uidInput = document.getElementById('uidInput');
    this.nameInput = document.getElementById('nameInput');
    this.avatarUpload = document.getElementById('avatarUpload');
    this.coordsDisplay = document.getElementById('coordsDisplay');
    this.loadingOverlay = document.getElementById('loadingOverlay');
    this.errorOverlay = document.getElementById('errorOverlay');
    this.retryBtn = document.getElementById('retryBtn');
    
    // 模板配置
    this.templates = {
      english: {
        1: "templates/english/English_vip1.png",
        2: "templates/english/English_vip2.png", 
        3: "templates/english/English_vip3.png",
        4: "templates/english/English_vip4.png",
        5: "templates/english/English_vip5.png",
        6: "templates/english/English_vip6.png",
        7: "templates/english/English_vip7.png",
        8: "templates/english/English_vip8.png",
        9: "templates/english/English_vip9.png"
      },
      arabic: {
        1: "templates/arabic/Arabic_vip1.png",
        2: "templates/arabic/Arabic_vip2.png",
        3: "templates/arabic/Arabic_vip3.png",
        4: "templates/arabic/Arabic_vip4.png",
        5: "templates/arabic/Arabic_vip5.png",
        6: "templates/arabic/Arabic_vip6.png",
        7: "templates/arabic/Arabic_vip7.png",
        8: "templates/arabic/Arabic_vip8.png",
        9: "templates/arabic/Arabic_vip9.png"
      },
      turkish: {
        1: "templates/turkish/Turkish_vip1.png",
        2: "templates/turkish/Turkish_vip2.png",
        3: "templates/turkish/Turkish_vip3.png",
        4: "templates/turkish/Turkish_vip4.png",
        5: "templates/turkish/Turkish_vip5.png",
        6: "templates/turkish/Turkish_vip6.png",
        7: "templates/turkish/Turkish_vip7.png",
        8: "templates/turkish/Turkish_vip8.png",
        9: "templates/turkish/Turkish_vip9.png"
      },
      spanish: {
        1: "templates/spanish/Spanish_vip1.png",
        2: "templates/spanish/Spanish_vip2.png",
        3: "templates/spanish/Spanish_vip3.png",
        4: "templates/spanish/Spanish_vip4.png",
        5: "templates/spanish/Spanish_vip5.png",
        6: "templates/spanish/Spanish_vip6.png",
        7: "templates/spanish/Spanish_vip7.png",
        8: "templates/spanish/Spanish_vip8.png",
        9: "templates/spanish/Spanish_vip9.png"
      },
      slovak: {
        1: "templates/slovak/Slovak_vip1.png",
        2: "templates/slovak/Slovak_vip2.png",
        3: "templates/slovak/Slovak_vip3.png",
        4: "templates/slovak/Slovak_vip4.png",
        5: "templates/slovak/Slovak_vip5.png",
        6: "templates/slovak/Slovak_vip6.png",
        7: "templates/slovak/Slovak_vip7.png",
        8: "templates/slovak/Slovak_vip8.png",
        9: "templates/slovak/Slovak_vip9.png"
      },
      vietnamese: {
        1: "templates/vietnamese/Vietnamese_vip1.png",
        2: "templates/vietnamese/Vietnamese_vip2.png",
        3: "templates/vietnamese/Vietnamese_vip3.png",
        4: "templates/vietnamese/Vietnamese_vip4.png",
        5: "templates/vietnamese/Vietnamese_vip5.png",
        6: "templates/vietnamese/Vietnamese_vip6.png",
        7: "templates/vietnamese/Vietnamese_vip7.png",
        8: "templates/vietnamese/Vietnamese_vip8.png",
        9: "templates/vietnamese/Vietnamese_vip9.png"
      },
      french: {
        1: "templates/french/French_vip1.png",
        2: "templates/french/French_vip2.png",
        3: "templates/french/French_vip3.png",
        4: "templates/french/French_vip4.png",
        5: "templates/french/French_vip5.png",
        6: "templates/french/French_vip6.png",
        7: "templates/french/French_vip7.png",
        8: "templates/french/French_vip8.png",
        9: "templates/french/French_vip9.png"
      },
      armenian: {
        1: "templates/armenian/Armenian_vip1.png",
        2: "templates/armenian/Armenian_vip2.png",
        3: "templates/armenian/Armenian_vip3.png",
        4: "templates/armenian/Armenian_vip4.png",
        5: "templates/armenian/Armenian_vip5.png",
        6: "templates/armenian/Armenian_vip6.png",
        7: "templates/armenian/Armenian_vip7.png",
        8: "templates/armenian/Armenian_vip8.png",
        9: "templates/armenian/Armenian_vip9.png"
      },
      indonesian: {
        1: "templates/indonesian/Indonesian_vip1.png",
        2: "templates/indonesian/Indonesian_vip2.png",
        3: "templates/indonesian/Indonesian_vip3.png",
        4: "templates/indonesian/Indonesian_vip4.png",
        5: "templates/indonesian/Indonesian_vip5.png",
        6: "templates/indonesian/Indonesian_vip6.png",
        7: "templates/indonesian/Indonesian_vip7.png",
        8: "templates/indonesian/Indonesian_vip8.png",
        9: "templates/indonesian/Indonesian_vip9.png"
      },
      malay: {
        1: "templates/malay/Malay_vip1.png",
        2: "templates/malay/Malay_vip2.png",
        3: "templates/malay/Malay_vip3.png",
        4: "templates/malay/Malay_vip4.png",
        5: "templates/malay/Malay_vip5.png",
        6: "templates/malay/Malay_vip6.png",
        7: "templates/malay/Malay_vip7.png",
        8: "templates/malay/Malay_vip8.png",
        9: "templates/malay/Malay_vip9.png"
      },
      bosnian: {
        1: "templates/bosnian/Bosnian_vip1.png",
        2: "templates/bosnian/Bosnian_vip2.png",
        3: "templates/bosnian/Bosnian_vip3.png",
        4: "templates/bosnian/Bosnian_vip4.png",
        5: "templates/bosnian/Bosnian_vip5.png",
        6: "templates/bosnian/Bosnian_vip6.png",
        7: "templates/bosnian/Bosnian_vip7.png",
        8: "templates/bosnian/Bosnian_vip8.png",
        9: "templates/bosnian/Bosnian_vip9.png"
      }
    };
    
    // 语言代码对应的中文名称
    this.countryNames = {
      english: '英语',
      arabic: '阿拉伯语',
      turkish: '土耳其语',
      spanish: '西班牙语',
      slovak: '斯洛伐克语',
      vietnamese: '越南语',
      french: '法语',
      armenian: '亚美尼亚语',
      indonesian: '印尼语',
      malay: '马来语',
      bosnian: '波斯尼亚语'
    };
    
    // 各语言的默认位置配置（基于1376x2976尺寸）
    this.defaultPositions = {
      // 英语的默认位置（固定位置）
      default: {
        avatarX: 193,
        avatarY: 1881,
        avatarSize: 273,
        uidX: 842,
        uidY: 1988,
        uidSize: 45,
        // UID 字间距（tracking），单位为像素；用于让 UID 看起来更“松”一点
        uidLetterSpacing: 2,
        nameX: 897,
        nameY: 2083,
        nameSize: 78
      }
    };
    
    // 当前状态
    this.template = new Image();
    this.template.crossOrigin = 'anonymous'; // 设置跨域，避免 canvas 被污染
    this.currentCountry = 'english';
    this.currentVip = 1;
    this.avatar = null;
    
    // 位置和大小参数（初始化为默认位置）
    this.avatarX = this.defaultPositions.default.avatarX;
    this.avatarY = this.defaultPositions.default.avatarY;
    this.avatarSize = this.defaultPositions.default.avatarSize;
    this.uidX = this.defaultPositions.default.uidX;
    this.uidY = this.defaultPositions.default.uidY;
    this.uidSize = this.defaultPositions.default.uidSize;
    this.uidLetterSpacing = this.defaultPositions.default.uidLetterSpacing;
    this.nameX = this.defaultPositions.default.nameX;
    this.nameY = this.defaultPositions.default.nameY;
    this.nameSize = this.defaultPositions.default.nameSize;
    
    // 拖拽状态
    this.dragging = null;
    this.dragCanvasPart = null;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.init();
  }
  
  async init() {
    // 等待字体加载完成
    await document.fonts.ready;
    
    this.setupEventListeners();
    // 初始显示加载动画
    this.showLoading();
    this.loadTemplate();
  }
  
  // 根据语言设置默认位置
  setDefaultPositions(country) {
    const positions = this.defaultPositions.default;
    
    this.avatarX = positions.avatarX;
    this.avatarY = positions.avatarY;
    this.avatarSize = positions.avatarSize;
    this.uidX = positions.uidX;
    this.uidY = positions.uidY;
    this.uidSize = positions.uidSize;
    this.uidLetterSpacing = positions.uidLetterSpacing;
    this.nameX = positions.nameX;
    this.nameY = positions.nameY;
    this.nameSize = positions.nameSize;
  }

  // 带字间距的文本绘制（用于 UID）
  drawTextWithLetterSpacing(ctx, text, x, y, letterSpacing) {
    if (!text) return;
    const spacing = Number(letterSpacing) || 0;
    if (spacing === 0) {
      ctx.fillText(text, x, y);
      return;
    }

    let currentX = x;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      ctx.fillText(ch, currentX, y);
      const chWidth = ctx.measureText(ch).width;
      currentX += chWidth + spacing;
    }
  }

  measureTextWithLetterSpacing(ctx, text, letterSpacing) {
    if (!text) return 0;
    const spacing = Number(letterSpacing) || 0;
    if (spacing === 0) return ctx.measureText(text).width;

    let width = 0;
    for (let i = 0; i < text.length; i++) {
      width += ctx.measureText(text[i]).width;
      if (i !== text.length - 1) width += spacing;
    }
    return width;
  }
  
  setupEventListeners() {
    // 国家标题点击事件（手风琴效果，现仅用于英语）
    document.querySelectorAll('.country-title').forEach(title => {
      title.addEventListener('click', () => {
        this.toggleCountry(title);
      });
    });
    
    // 模板选择事件
    document.querySelectorAll('.vip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectTemplate(btn);
      });
    });
    
    // 头像上传
    this.avatarUpload.addEventListener('change', (e) => {
      this.handleAvatarUpload(e);
    });
    
    // 粘贴上传头像
    document.addEventListener('paste', (e) => {
      this.handlePasteUpload(e);
    });
    
    // 拖拽事件（在显示canvas上）
    this.canvasTop.addEventListener('mousedown', (e) => this.startDrag(e, 'top'));
    this.canvasTop.addEventListener('mousemove', (e) => this.duringDrag(e, 'top'));
    this.canvasTop.addEventListener('mouseup', () => this.stopDrag());
    this.canvasBottom.addEventListener('mousedown', (e) => this.startDrag(e, 'bottom'));
    this.canvasBottom.addEventListener('mousemove', (e) => this.duringDrag(e, 'bottom'));
    this.canvasBottom.addEventListener('mouseup', () => this.stopDrag());
    
    // 右键菜单处理：将显示canvas的右键复制重定向到原始canvas
    this.canvasTop.addEventListener('contextmenu', (e) => this.handleContextMenu(e));
    this.canvasBottom.addEventListener('contextmenu', (e) => this.handleContextMenu(e));
    
    
    // 姓名大小调整按钮
    document.getElementById('nameBigger').onclick = () => { this.nameSize += 2; this.drawAll(); };
    document.getElementById('nameSmaller').onclick = () => { this.nameSize -= 2; this.drawAll(); };
    
    // 姓名位置调整按钮
    document.getElementById('nameUp').onclick = () => { this.nameY -= 5; this.drawAll(); };
    document.getElementById('nameDown').onclick = () => { this.nameY += 5; this.drawAll(); };
    document.getElementById('nameLeft').onclick = () => { this.nameX -= 5; this.drawAll(); };
    document.getElementById('nameRight').onclick = () => { this.nameX += 5; this.drawAll(); };
    
    // 下载功能
    document.getElementById('downloadBtn').onclick = () => this.downloadCertificate();
    
    // 复制功能
    document.getElementById('copyBtn').onclick = () => this.copyCertificate();
    
    // 重试按钮
    if (this.retryBtn) {
      this.retryBtn.addEventListener('click', () => {
        this.loadTemplate();
      });
    }
    
    // 输入监听（UID 和姓名）
    this.uidInput.addEventListener('input', () => this.drawAll());
    this.nameInput.addEventListener('input', () => this.drawAll());
    
    // 默认选择第一个模板并展开第一个国家
    document.addEventListener('DOMContentLoaded', () => {
      // 默认展开第一个国家
      const firstCountry = document.querySelector('.country-title');
      if (firstCountry) {
        const country = firstCountry.dataset.country;
        const vipGrid = document.querySelector(`.vip-grid[data-country="${country}"]`);
        if (vipGrid) {
          vipGrid.classList.add('expanded');
          firstCountry.classList.remove('collapsed');
        }
      }
      
      // 默认选择第一个VIP按钮
      const firstBtn = document.querySelector('.vip-btn');
      if (firstBtn) {
        firstBtn.classList.add('active');
      }
    });
  }
  
  toggleCountry(clickedTitle) {
    const country = clickedTitle.dataset.country;
    const vipGrid = document.querySelector(`.vip-grid[data-country="${country}"]`);
    const isExpanded = vipGrid.classList.contains('expanded');
    
    // 关闭所有其他国家
    document.querySelectorAll('.vip-grid').forEach(grid => {
      grid.classList.remove('expanded');
    });
    document.querySelectorAll('.country-title').forEach(title => {
      title.classList.add('collapsed');
    });
    
    // 如果点击的是当前展开的国家，则关闭；否则展开
    if (!isExpanded) {
      vipGrid.classList.add('expanded');
      clickedTitle.classList.remove('collapsed');
    }
  }
  
  selectTemplate(btn) {
    // 移除所有活动状态
    document.querySelectorAll('.vip-btn').forEach(b => b.classList.remove('active'));
    
    // 添加当前活动状态
    btn.classList.add('active');
    
    // 获取新选择的语言
    const newCountry = btn.dataset.country;
    
    // 如果语言发生变化，更新位置为对应语言的默认位置
    if (this.currentCountry !== newCountry) {
      this.setDefaultPositions(newCountry);
    }
    
    // 更新当前选择
    this.currentCountry = newCountry;
    this.currentVip = parseInt(btn.dataset.vip);
    
    // 加载新模板
    this.loadTemplate();
  }
  
  loadTemplate() {
    // 隐藏错误提示，显示加载动画
    this.hideError();
    this.showLoading();
    
    const templatePath = this.templates[this.currentCountry][this.currentVip];
    
    // 先尝试使用 crossOrigin 加载（避免 canvas 被污染）
    this.template.crossOrigin = 'anonymous';
    this.template.src = templatePath;
    
    this.template.onload = () => {
      this.hideLoading();
      this.drawAll();
    };
    
    this.template.onerror = () => {
      // 如果 crossOrigin 导致加载失败，尝试不使用 crossOrigin
      if (this.template.crossOrigin === 'anonymous') {
        console.warn('使用 crossOrigin 加载失败，尝试不使用 crossOrigin');
        this.template.crossOrigin = null;
        this.template.src = templatePath;
        return;
      }
      
      console.warn(`模板文件 ${templatePath} 未找到`);
      this.hideLoading();
      this.showError();
    };
  }
  
  showLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.remove('hidden');
    }
  }
  
  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('hidden');
    }
  }
  
  showError() {
    if (this.errorOverlay) {
      this.errorOverlay.classList.remove('hidden');
    }
  }
  
  hideError() {
    if (this.errorOverlay) {
      this.errorOverlay.classList.add('hidden');
    }
  }
  
  handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
      this.loadAvatarFromFile(file);
    }
  }
  
  handlePasteUpload(e) {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        this.loadAvatarFromFile(file);
        e.preventDefault();
        break;
      }
    }
  }
  
  loadAvatarFromFile(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.avatar = new Image();
        this.avatar.crossOrigin = 'anonymous'; // 设置跨域，避免 canvas 被污染
        this.avatar.onload = () => this.drawAll();
        this.avatar.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  drawAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 保持宽高比绘制模板图片
    this.ctx.drawImage(this.template, 0, 0, 1376, 2976);

    // 绘制头像（圆形裁切 + 居中填充，无外框）
    if (this.avatar) {
      const imgW = this.avatar.width;
      const imgH = this.avatar.height;
      const cropSide = Math.min(imgW, imgH);
      const sx = (imgW - cropSide) / 2;
      const sy = (imgH - cropSide) / 2;

      const centerX = this.avatarX + this.avatarSize / 2;
      const centerY = this.avatarY + this.avatarSize / 2;
      const radius = this.avatarSize / 2;

      // 裁切并绘制头像（圆形，无外框）
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.clip();
      this.ctx.drawImage(
        this.avatar,
        sx,
        sy,
        cropSide,
        cropSide,
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      );
      this.ctx.restore();
    }

    // 绘制 UID：OpenSans 字体 + 黑色 + 粗体
    this.ctx.save();
    this.ctx.font = `bold ${this.uidSize}px "OpenSans", sans-serif`;
    this.ctx.fillStyle = "#000000";
    this.drawTextWithLetterSpacing(this.ctx, this.uidInput.value, this.uidX, this.uidY, this.uidLetterSpacing);
    this.ctx.restore();

    // 绘制姓名：Riwaya 字体 + 白色 + 居中
    if (this.nameInput.value) {
      this.ctx.save();
      // 确保使用正确的字体，添加fallback以确保字体加载
      this.ctx.font = `${this.nameSize}px "Riwaya", "Arial", sans-serif`;
      this.ctx.fillStyle = "#ffffff";
      // 计算文本宽度并居中显示
      const nameText = this.nameInput.value;
      const nameWidth = this.ctx.measureText(nameText).width;
      const nameXCentered = this.nameX - nameWidth / 2;
      this.ctx.fillText(nameText, nameXCentered, this.nameY);
      this.ctx.restore();
    }

    // 将原始canvas的内容复制到两个显示canvas（切分显示）
    this.updateDisplayCanvases();
    
    // 更新坐标显示
    this.updateCoordsDisplay();
  }
  
  // 将原始canvas切分为上下两部分显示
  updateDisplayCanvases() {
    const halfHeight = this.canvas.height / 2; // 1488
    
    // 清空显示canvas
    this.ctxTop.clearRect(0, 0, this.canvasTop.width, this.canvasTop.height);
    this.ctxBottom.clearRect(0, 0, this.canvasBottom.width, this.canvasBottom.height);
    
    // 复制上半部分到canvasTop
    this.ctxTop.drawImage(
      this.canvas,
      0, 0,                    // 源canvas的起始位置
      this.canvas.width, halfHeight,  // 源canvas的宽度和高度
      0, 0,                    // 目标canvas的起始位置
      this.canvasTop.width, this.canvasTop.height  // 目标canvas的宽度和高度
    );
    
    // 复制下半部分到canvasBottom
    this.ctxBottom.drawImage(
      this.canvas,
      0, halfHeight,           // 源canvas的起始位置（从中间开始）
      this.canvas.width, halfHeight,  // 源canvas的宽度和高度
      0, 0,                    // 目标canvas的起始位置
      this.canvasBottom.width, this.canvasBottom.height  // 目标canvas的宽度和高度
    );
  }
  
  updateCoordsDisplay() {
    const countryName =
      (this.countryNames && this.countryNames[this.currentCountry]) || this.currentCountry;
    this.coordsDisplay.innerHTML =
      `当前模板: ${countryName} VIP${this.currentVip}<br>` +
      `UID: x=${Math.round(this.uidX)}, y=${Math.round(this.uidY)}, size=${Math.round(this.uidSize)}<br>` +
      `姓名: x=${Math.round(this.nameX)}, y=${Math.round(this.nameY)}, size=${Math.round(this.nameSize)}<br>` +
      `头像: x=${Math.round(this.avatarX)}, y=${Math.round(this.avatarY)}, size=${Math.round(this.avatarSize)}`;
  }
  
  // 将显示canvas坐标转换为原始canvas坐标
  convertToOriginalCoords(x, y, canvasPart) {
    const scaleX = this.canvas.width / this.canvasTop.offsetWidth;
    const scaleY = this.canvas.height / (this.canvasTop.offsetHeight * 2); // 两个canvas的总高度
    
    let originalY = y * scaleY;
    if (canvasPart === 'bottom') {
      originalY += this.canvas.height / 2; // 下半部分需要加上上半部分的高度
    }
    
    return {
      x: x * scaleX,
      y: originalY
    };
  }
  
  startDrag(e, canvasPart) {
    const scaleX = this.canvas.width / this.canvasTop.offsetWidth;
    const scaleY = this.canvas.height / (this.canvasTop.offsetHeight * 2);
    
    let mouseX = e.offsetX * scaleX;
    let mouseY = e.offsetY * scaleY;
    
    if (canvasPart === 'bottom') {
      mouseY += this.canvas.height / 2; // 下半部分需要加上上半部分的高度
    }
    
    // 计算文本宽度（用于拖拽检测）
    this.ctx.font = `bold ${this.uidSize}px "OpenSans", sans-serif`;
    const uidWidth = this.measureTextWithLetterSpacing(this.ctx, this.uidInput.value, this.uidLetterSpacing) || 50;
    
    this.ctx.font = `${this.nameSize}px "Riwaya", "Arial", sans-serif`;
    const nameWidth = this.ctx.measureText(this.nameInput.value).width || 50;
    
    // 检查头像区域（圆形）
    const avatarCenterX = this.avatarX + this.avatarSize / 2;
    const avatarCenterY = this.avatarY + this.avatarSize / 2;
    const avatarRadius = this.avatarSize / 2;
    const distFromAvatarCenter = Math.sqrt(
      Math.pow(mouseX - avatarCenterX, 2) + Math.pow(mouseY - avatarCenterY, 2)
    );
    const avatarHit = distFromAvatarCenter <= avatarRadius;
    
    // 检查UID区域（UID的x为左侧起点）
    const uidHit =
      mouseX > this.uidX - 30 &&
      mouseX < this.uidX + uidWidth + 30 &&
      mouseY > this.uidY - this.uidSize - 10 &&
      mouseY < this.uidY + 10;
    
    // 检查姓名区域（姓名的x为“居中中心点”）
    const nameLeft = this.nameX - nameWidth / 2;
    const nameRight = this.nameX + nameWidth / 2;
    const nameHit =
      mouseX > nameLeft - 30 &&
      mouseX < nameRight + 30 &&
      mouseY > this.nameY - this.nameSize - 10 &&
      mouseY < this.nameY + 10;
    
    // 检查是否点击在可拖拽区域内
    if (avatarHit) {
      this.dragging = 'avatar';
      this.dragCanvasPart = canvasPart;
    } else if (uidHit) {
      this.dragging = 'uid';
      this.dragCanvasPart = canvasPart;
    } else if (nameHit) {
      this.dragging = 'name';
      this.dragCanvasPart = canvasPart;
    }
    
    this.offsetX = mouseX;
    this.offsetY = mouseY;
  }
  
  duringDrag(e, canvasPart) {
    if (!this.dragging) return;
    
    const scaleX = this.canvas.width / this.canvasTop.offsetWidth;
    const scaleY = this.canvas.height / (this.canvasTop.offsetHeight * 2);
    
    let mouseX = e.offsetX * scaleX;
    let mouseY = e.offsetY * scaleY;
    
    if (canvasPart === 'bottom') {
      mouseY += this.canvas.height / 2;
    }
    
    const dx = mouseX - this.offsetX;
    const dy = mouseY - this.offsetY;
    
    if (this.dragging === 'avatar') {
      this.avatarX += dx;
      this.avatarY += dy;
    }
    if (this.dragging === 'uid') { 
      this.uidX += dx; 
      this.uidY += dy; 
    }
    if (this.dragging === 'name') {
      this.nameX += dx;
      this.nameY += dy;
    }
    
    this.offsetX = mouseX;
    this.offsetY = mouseY;
    this.drawAll();
  }
  
  stopDrag() {
    this.dragging = null;
    this.dragCanvasPart = null;
  }
  
  // 处理右键菜单：优先"复制完整证书到剪贴板"，失败则打开完整图片让用户右键复制
  async handleContextMenu(e) {
    // 阻止默认右键菜单（否则用户只能复制"半张预览图"）
    e.preventDefault();
    
    // 确保 canvas 有内容
    if (!this.canvas || !this.template.complete) {
      alert('证书尚未加载完成，请稍候再试。');
      return;
    }
    
    // 尝试复制到剪贴板
    const ok = await this.copyFullImageToClipboard();
    if (ok) {
      // 复制成功，显示提示
      const tip = document.createElement('div');
      tip.textContent = '✓ 已复制到剪贴板';
      tip.style.cssText = 'position:fixed;top:20px;right:20px;background:#4caf50;color:#fff;padding:12px 20px;border-radius:8px;z-index:10000;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
      document.body.appendChild(tip);
      setTimeout(() => document.body.removeChild(tip), 2000);
      return;
    }
    
    // 复制失败，打开新标签页让用户右键复制
    this.openFullImageInNewTab();
  }
  
  async copyFullImageToClipboard() {
    // Clipboard API 写入图片通常要求 HTTPS/localhost（安全上下文），并且需要 ClipboardItem 支持
    if (!window.isSecureContext) return false;
    if (!navigator.clipboard || typeof navigator.clipboard.write !== 'function') return false;
    if (typeof window.ClipboardItem !== 'function') return false;
    
    return await new Promise((resolve) => {
      this.canvas.toBlob(async (blob) => {
        try {
          if (!blob) return resolve(false);
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          console.log('完整证书已复制到剪贴板');
          resolve(true);
        } catch (err) {
          console.warn('复制到剪贴板失败，将使用打开新标签页方式:', err);
          resolve(false);
        }
      }, 'image/png');
    });
  }
  
  openFullImageInNewTab() {
    try {
      const dataUrl = this.canvas.toDataURL('image/png');
      const win = window.open('', '_blank');
      
      if (!win) {
        // 弹窗被拦截时，退化为直接下载
        const link = document.createElement('a');
        link.download = `SW证书_VIP${this.currentVip}.png`;
        link.href = dataUrl;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 100);
        alert('弹窗被拦截，已自动下载图片。');
        return;
      }
      
      win.document.open();
      win.document.write(`<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>完整证书图片 - 右键复制</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      margin: 0;
      background: #0b0f14;
      color: #fff;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 16px;
      padding: 20px;
    }
    .tip {
      opacity: 0.9;
      font-size: 16px;
      text-align: center;
      background: rgba(76, 175, 80, 0.2);
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid rgba(76, 175, 80, 0.5);
    }
    img {
      max-width: 95vw;
      max-height: 85vh;
      border-radius: 12px;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6);
      background: #05080c;
      cursor: pointer;
      user-select: none;
    }
    img:hover {
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    }
  </style>
</head>
<body>
  <div class="tip">📋 请在图片上右键 → 选择"复制图片"（此图片为完整证书）</div>
  <img src="${dataUrl}" alt="完整证书" onclick="this.focus()" />
  <script>
    // 确保图片可以右键复制
    document.querySelector('img').addEventListener('contextmenu', function(e) {
      // 允许默认右键菜单
    });
  </script>
</body>
</html>`);
      win.document.close();
    } catch (err) {
      console.error('打开新标签页失败:', err);
      alert('无法打开新标签页，请尝试使用下载按钮。\n错误信息: ' + err.message);
    }
  }
  
  downloadCertificate() {
    try {
      // 确保 canvas 有内容
      if (!this.canvas || !this.template.complete) {
        alert('证书尚未加载完成，请稍候再试。');
        return;
      }
      
      const link = document.createElement('a');
      link.download = `SW证书_VIP${this.currentVip}.png`;
      link.href = this.canvas.toDataURL('image/png');
      
      // 将链接添加到 DOM（某些浏览器需要）
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // 触发下载
      link.click();
      
      // 延迟移除链接（确保下载已开始）
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } catch (err) {
      console.error('下载失败:', err);
      alert('下载失败，请尝试右键保存图片。\n错误信息: ' + err.message);
    }
  }
  
  async copyCertificate() {
    try {
      // 确保 canvas 有内容
      if (!this.canvas || !this.template.complete) {
        alert('证书尚未加载完成，请稍候再试。');
        return;
      }
      
      // 尝试使用 Clipboard API 复制
      const ok = await this.copyFullImageToClipboard();
      if (ok) {
        // 复制成功，显示提示
        this.showCopySuccess();
        return;
      }
      
      // 如果 Clipboard API 不可用，打开新标签页让用户复制
      this.openFullImageInNewTab();
      alert('当前浏览器不支持直接复制图片。\n已为你打开"完整证书图片"新标签页：请在新页对图片右键复制。');
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制失败，请尝试使用下载按钮或右键保存图片。\n错误信息: ' + err.message);
    }
  }
  
  showCopySuccess() {
    // 显示成功提示
    const tip = document.createElement('div');
    tip.textContent = '✓ 已复制到剪贴板';
    tip.style.cssText = 'position:fixed;top:20px;right:20px;background:#4caf50;color:#fff;padding:12px 20px;border-radius:8px;z-index:10000;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);animation:fadeIn 0.3s ease;';
    document.body.appendChild(tip);
    setTimeout(() => {
      tip.style.opacity = '0';
      tip.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        if (tip.parentNode) {
          document.body.removeChild(tip);
        }
      }, 300);
    }, 2000);
  }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  new CertificateGenerator();
});
