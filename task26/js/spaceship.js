/**
 * 创建飞船原型
 * @param id 飞船编号
 */
function Spaceship(id) {
    this.id = id;
    this.speed = 1;
    this.energy = 100;
    this.consumeRate = 5;
    this.rechargeRate = 2;
    this.status = 'STOP';
    this.timer = null;

    (function () {
        var shipDiv = document.createElement('div');
        shipDiv.id = 'ship' + id;
        shipDiv.className = 'spaceship ship' + id;
        document.body.appendChild(shipDiv);
    })(id);
}

Spaceship.prototype = {
    //公用属性
    _energyMax: 100,
    _energyMin: 0,
    //动力系统
    start: function (id) {
        if (id == this.id) {
            this.status = 'START';
            $('ship'+id).style.animationPlayState = 'running';
            this.consume();
            console.log('ship' + this.id + ' start! speed: ' + this.speed + 'km/s, conumse rate: ' + this.consumeRate + '/s.');
        }
    },
    stop: function (id) {
        if (id == this.id) {
            this.status = 'STOP';
            $('ship'+id).style.animationPlayState = 'paused';
            this.recharge();
            console.log('ship' + this.id + ' stoped! recharge rate: ' + this.rechargeRate + '/s.');
        }
    },
    //能源系统
    consume: function () {
        if (this.status == 'START') {
            clearInterval(this.timer);
            var that = this;
            var consuming = setInterval(function () {
                that.energy -= that.consumeRate;
                if (that.energy < that._energyMin) {
                    that.energy = that._energyMin;
                    clearInterval(consuming);
                    that.stop(that.id);
                }
                console.log('ship' + that.id + ' energy: ' + that.energy);
            }, 1000);
            this.timer = consuming;
        }
    },
    recharge: function () {
        if (this.status == 'STOP') {
            clearInterval(this.timer);
            var that = this;
            var recharging = setInterval(function () {
                that.energy += that.rechargeRate;
                if (that.energy > that._energyMax) {
                    that.energy = that._energyMax;
                    clearInterval(recharging);
                }
                console.log('ship' + that.id + ' energy: ' + that.energy);
            }, 1000)
            this.timer = recharging;
        }
    },
    //自爆系统
    destruct: function (id) {
        if (id == this.id) {
            clearInterval(this.timer);
            document.body.removeChild($('ship' + id));
            console.log('boom! you gain the inner peace!');
        }
    }
}