class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      # string     : 文字列
      # text       : 長い文字列
      # integer    : 整数
      # float      : 浮動小数
      # decimal    : 倍精度小数
      # datetime   : 日時
      # timestamp  : タイムスタンプ
      # timestamps : created_at, updated_at
      # time       : 時間
      # date       : 日付
      # binary     : バイナリデータ
      # boolean    : Boolean
      
      t.text :state
      t.text :task
      t.date :limit_date

      t.timestamps
    end
  end
end
