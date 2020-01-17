// 掲示板アプリ（クライアント）側 : P313 ~ 315
// サーバー側を記述しないと動かないです

import React from "react";
import ReactDOM from "react-dom";
import request from "superagent";

// 書き込みフォームのコンポーネントを定義
class BBSForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", body: "" };
  }
  // テキストボックスの値が変化した時の処理
  nameChanged(e) {
    this.setState({ name: e.target.value });
  }
  bodyChanged(e) {
    this.setState({ body: e.target.value });
  }
  // Webサーバーに対して書き込みを投稿する
  post(e) {
    request
      .get("api/write")
      .query({ name: this.state.name, body: this.state.body })
      .end((err, data) => {
        if (err) {
          console.error(err);
        }
        this.setState({ body: "" });
        if (this.props.onPost) {
          this.props.onPost();
        }
      });
  }
  render() {
    return (
      <div style={styles.form}>
        名前：
        <br />
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.nameChanged(e)}
        />
        <br />
        本文：
        <br />
        <input
          type="text"
          value={this.state.body}
          size="60"
          onChange={e => this.bodyChanged(e)}
        />
        <br />
        <button onClick={e => this.post()}>発言</button>
      </div>
    );
  }
}
// メインコンポーネントを定義
class BBSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  // コンポーネントがマウントされたらログを読み込む
  componentWillMount() {
    this.loadLogs();
  }
  // APIにアクセスして掲示板のログ一覧を取得
  loadLogs() {
    request.get("api/getItems").end((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setState({ items: data.body.logs });
    });
  }
  render() {
    // 発言ログの1つずつを生成する
    const itemsHtml = this.state.items.map(e => (
      <li key={e._id}>
        {e.name}-{e.body}
      </li>
    ));
    return (
      <div>
        <h1 style={styles.h1}>掲示板</h1>
        <BBSForm onPost={e => this.loadLogs()} />
        <p style={styles.right}>
          <button onClick={e => this.loadLogs()}>再読込</button>
        </p>
        <ul>{itemsHtml}</ul>
      </div>
    );
  }
}

// スタイルを定義
const styles = {
  h1: {
    backgroundColor: "blue",
    color: "white",
    fontSize: "24",
    padding: 12
  },
  form: {
    padding: 12,
    border: "1px solid silver",
    backgroundColor: "#F0F0F0"
  },
  right: {
    textAlign: "right"
  }
};
// DOMにメインコンポーネントを書き込む
ReactDOM.render(<BBSApp />, document.getElementById("root"));
